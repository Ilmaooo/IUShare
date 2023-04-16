// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ0C4FsL8XD_-cEIgczZKOHE8QfIc8HYo",
  authDomain: "iushare-51a0e.firebaseapp.com",
  projectId: "iushare-51a0e",
  storageBucket: "iushare-51a0e.appspot.com",
  messagingSenderId: "853644517621",
  appId: "1:853644517621:web:63e402e356edeea57f25bc",
  measurementId: "G-RTBHMDFCR8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
