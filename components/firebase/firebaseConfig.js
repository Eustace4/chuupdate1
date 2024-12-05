// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGOEoRS23xM8Qnyp5J7xPQxa9izpI7goo",
  authDomain: "friendy-budget.firebaseapp.com",
  projectId: "friendy-budget",
  storageBucket: "friendy-budget.firebasestorage.app",
  messagingSenderId: "231852432052",
  appId: "1:231852432052:web:5f3cac0156da956a8155e1",
  measurementId: "G-41SKGS9Z76"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);