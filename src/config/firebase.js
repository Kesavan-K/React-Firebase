// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPrv-vf0jzNQvGw8WX4GQYp0eWxhQs940",
  authDomain: "fir-e2941.firebaseapp.com",
  projectId: "fir-e2941",
  storageBucket: "fir-e2941.appspot.com",
  messagingSenderId: "14316171783",
  appId: "1:14316171783:web:061265cb1d6705d8eaf0a2",
  measurementId: "G-KG7Y8546WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
export const auth = getAuth(app)
console.log(auth);
export const googleProvider = new GoogleAuthProvider();
console.log(googleProvider);
export const db = getFirestore(app)
export const storage = getStorage(app)