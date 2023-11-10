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
  apiKey: "AIzaSyCmH6ZNo5WTlrxpEVAWVG60Nm-Vv8Dbp8Q",
  authDomain: "kdotkhanh-emp-1d69c.firebaseapp.com",
  projectId: "kdotkhanh-emp-1d69c",
  storageBucket: "kdotkhanh-emp-1d69c.appspot.com",
  messagingSenderId: "8115049456",
  appId: "1:8115049456:web:53b2ae00b0bbf2a0664335",
  measurementId: "G-JF7EEZSHWB",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

createApp(App).mount("#app");
