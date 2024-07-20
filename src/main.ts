import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

createApp(App).mount("#app");
