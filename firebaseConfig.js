import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Config
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASESTORAGEBUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASEMESSAGINGSENDERID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASEAPPID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASEMEASUREMENTID || "",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
