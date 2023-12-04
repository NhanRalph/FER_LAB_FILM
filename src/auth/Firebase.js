// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZz1SWpwqWc8zfAPHvz2v1j9Xy8qo3Eds",
  authDomain: "fer-lab-fc44e.firebaseapp.com",
  projectId: "fer-lab-fc44e",
  storageBucket: "fer-lab-fc44e.appspot.com",
  messagingSenderId: "150671528441",
  appId: "1:150671528441:web:3c21387580a74b16ddad28",
  measurementId: "G-EQ50BBGNTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
