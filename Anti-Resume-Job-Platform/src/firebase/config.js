import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsfltJNUiLbu2tIFa6m93S_iFqJguTyq0",
  authDomain: "masai-hackathon-e4272.firebaseapp.com",
  projectId: "masai-hackathon-e4272",
  storageBucket: "masai-hackathon-e4272.appspot.com",
  messagingSenderId: "543339633503",
  appId: "1:543339633503:web:68ffeb04578de443a974ea",
  measurementId: "G-YKEEQJTLQH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
