// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzCwo5hODSnfz_WWdsf7-QRMtwm-0mpQE",
  authDomain: "netflix-copy-543f1.firebaseapp.com",
  projectId: "netflix-copy-543f1",
  storageBucket: "netflix-copy-543f1.firebasestorage.app",
  messagingSenderId: "540603306794",
  appId: "1:540603306794:web:a27c248c799453ce1f0453",
  measurementId: "G-0TKKSCH06R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
