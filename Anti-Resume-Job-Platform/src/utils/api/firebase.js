import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOz-_ot16GROn-LrgsGc8gOqxee7qdqTk",
  authDomain: "anti-resume-88877.firebaseapp.com",
  projectId: "anti-resume-88877",
  storageBucket: "anti-resume-88877.firebasestorage.app",
  messagingSenderId: "772629546789",
  appId: "1:772629546789:web:5d75451f0e3eb03db4fccc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
