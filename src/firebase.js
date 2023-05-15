// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAA_U_ZVEtb_8U8KWQYIYZ-v7MPHpJGcE",
  authDomain: "ius-share.firebaseapp.com",
  projectId: "ius-share",
  storageBucket: "ius-share.appspot.com",
  messagingSenderId: "846482784270",
  appId: "1:846482784270:web:18e668154ff67042b53c5f",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
// export const auth = getAuth();
