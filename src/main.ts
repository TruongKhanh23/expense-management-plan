import App from "./App.vue";
import { createApp } from "vue";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import "./style.css";
import 'vue3-toastify/dist/index.css';
import '@/assets/css/custom-toast-styles.css';

const firebaseConfig = {
  apiKey: "AIzaSyAgjREuHZTcn5zLddy-00uTKxbzA07pl40",
  authDomain: "kdotkhanh-expemaplan.firebaseapp.com",
  projectId: "kdotkhanh-expemaplan",
  storageBucket: "kdotkhanh-expemaplan.appspot.com",
  messagingSenderId: "726093436025",
  appId: "1:726093436025:web:e3bdda44d79014e517f0a8",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

const app = createApp(App)
app.mount("#app");
