import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
