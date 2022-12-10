import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_l-LopGxXbD2f9KiM5adHK3VgwXTsXdI",
  authDomain: "bookclub-6a60a.firebaseapp.com",
  projectId: "bookclub-6a60a",
  storageBucket: "bookclub-6a60a.appspot.com",
  messagingSenderId: "970369315999",
  appId: "1:970369315999:web:1ee91f9c720c7d1e1a1eaa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
