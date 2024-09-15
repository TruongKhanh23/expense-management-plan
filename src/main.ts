import { createApp } from "vue";
import App from "./App.vue";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import store from "./store/index";
import router from "./router";

import "./style.css";
import "vue3-toastify/dist/index.css"; // Import the CSS for Toastify
import { toast } from "vue3-toastify"; // Import toast and ToastContainer

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgjREuHZTcn5zLddy-00uTKxbzA07pl40",
  authDomain: "kdotkhanh-expemaplan.firebaseapp.com",
  projectId: "kdotkhanh-expemaplan",
  storageBucket: "kdotkhanh-expemaplan.appspot.com",
  messagingSenderId: "726093436025",
  appId: "1:726093436025:web:e3bdda44d79014e517f0a8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

let isInitialized = false;

onAuthStateChanged(auth, (user) => {
  checkInternetConnection();

  if (!isInitialized) {
    if (user) {
      router.push("/home");
    }
    const app = createApp(App);
    app.use(router);
    app.use(store);
    app.mount("#app");
    isInitialized = true;
  }
});

// Detect offline/online status and notify the user
const handleOffline = () => {
  toast.error(
    "Bạn đã mất kết nối internet. Vui lòng kiểm tra kết nối của bạn.",
  );
};

const handleOnline = () => {
  toast.success("Kết nối internet đã được khôi phục. Hãy nhấn F5 để thử lại.");
};

const checkInternetConnection = () => {
  console.log("went check internet connection");

  if (!navigator.onLine) {
    toast.error(
      "Bạn đã mất kết nối internet. Vui lòng kiểm tra kết nối của bạn.",
    );
  }
};

window.addEventListener("offline", handleOffline);
window.addEventListener("online", handleOnline);
