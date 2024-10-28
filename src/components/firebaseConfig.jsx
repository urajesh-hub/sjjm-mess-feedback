

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyDb6uymXtiK9p-n7UFqdG-LOulrFhOSHp0",
  authDomain:"sjj-mess.firebaseapp.com",
  projectId:"sjj-mess",
  storageBucket:"sjj-mess.appspot.com",
  messagingSenderId:"630833792567",
  appId:"1:630833792567:web:02a39a7ec7be20410f21b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);