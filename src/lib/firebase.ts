import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAPn-bQufm0nCxdlPGFmdqJbhvdLztUlUo",
  authDomain: "rozina-s.firebaseapp.com",
  projectId: "rozina-s",
  storageBucket: "rozina-s.firebasestorage.app",
  messagingSenderId: "201717102810",
  appId: "1:201717102810:web:cfc3e5e7b4c6d03b070de3",
  measurementId: "G-0E8SCRMRGW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
