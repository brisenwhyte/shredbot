// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs3PDxhsm8HDVXWoad_MIemSuBontRgfw",
  authDomain: "shredbot-d5bb5.firebaseapp.com",
  projectId: "shredbot-d5bb5",
  storageBucket: "shredbot-d5bb5.firebasestorage.app",
  messagingSenderId: "118446326885",
  appId: "1:118446326885:web:4f298e0b6a884c617c328c",
  measurementId: "G-DT89VSXXLE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
