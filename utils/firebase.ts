import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase config or use environment variables
const firebaseConfig = {
  projectId: "antigrav-app-543210",
  appId: "1:1030260524708:web:96629da4dbd0b617590831",
  storageBucket: "antigrav-app-543210.firebasestorage.app",
  apiKey: "AIzaSyDIpc8YBVb_57FvWt_DkihbiaQN-p9aOj0",
  authDomain: "antigrav-app-543210.firebaseapp.com",
  messagingSenderId: "1030260524708"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
