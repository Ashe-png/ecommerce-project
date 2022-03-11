import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCiiOiOGpqSWW-8hu-dxchVwFC5YSNsbBA",
  authDomain: "ecom-4b6a0.firebaseapp.com",
  databaseURL: "https://ecom-4b6a0-default-rtdb.firebaseio.com",
  projectId: "ecom-4b6a0",
  storageBucket: "ecom-4b6a0.appspot.com",
  messagingSenderId: "419968612902",
  appId: "1:419968612902:web:0888d1fe23d9b6362304e7",
  measurementId: "G-JD95XGGVW7"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
