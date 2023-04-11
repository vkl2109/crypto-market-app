// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5PLppDszRPgA1t4MxVOY2eH-jPYqEuI4",
  authDomain: "crypto-mobile-app-bc215.firebaseapp.com",
  projectId: "crypto-mobile-app-bc215",
  storageBucket: "crypto-mobile-app-bc215.appspot.com",
  messagingSenderId: "797692474450",
  appId: "1:797692474450:web:522b7c4ab8d58536015b8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };