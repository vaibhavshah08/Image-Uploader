import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "imageupload-90952.firebaseapp.com",
  projectId: "imageupload-90952",
  storageBucket: "imageupload-90952.appspot.com",
  messagingSenderId: "754420809316",
  appId: "1:754420809316:web:1bb248ccdeff7b3a9a6971",
  measurementId: "G-VX3MXM6YC0"
};

export const app = initializeApp(firebaseConfig);