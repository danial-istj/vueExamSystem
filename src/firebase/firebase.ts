import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqyJ5qM993tYCb7CZE2wuoXy37456HE-k",
  authDomain: "practicing-vue.firebaseapp.com",
  projectId: "practicing-vue",
  storageBucket: "practicing-vue.firebasestorage.app",
  messagingSenderId: "524090876326",
  appId: "1:524090876326:web:906f16972eeeeb8f022f67",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
