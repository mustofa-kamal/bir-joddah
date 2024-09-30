// src/app/firebase.js

// Import necessary functions
import { initializeApp } from "firebase/app";
// Remove unused imports
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAx4PRnqep-ZPJ1MzqNET36quu_Q6hfRY4",
  authDomain: "bir-joddah.firebaseapp.com",
  projectId: "bir-joddah",
  storageBucket: "bir-joddah.appspot.com",
  messagingSenderId: "701542796146",
  appId: "1:701542796146:web:b7c6b21de881d759386beb",
  measurementId: "G-8ZK5HWGD57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export app if needed
export default app;