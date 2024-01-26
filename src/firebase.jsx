// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, onAuthStateChanged, updateProfile} from "firebase/auth";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use

// const firebaseConfig = {
//   apiKey: "AIzaSyCUf2j3nIjRBa9hTu7u71gTOCFES9YHNHw",
//   authDomain: "techbooks-6aa5b.firebaseapp.com",
//   projectId: "techbooks-6aa5b",
//   storageBucket: "techbooks-6aa5b.appspot.com",
//   messagingSenderId: "367717926837",
//   appId: "1:367717926837:web:3343234c92baecb0c3fbfc",
//   measurementId: "G-15HQMK0D9B"
// }; Kanha

// const firebaseConfig = {
//   apiKey: "AIzaSyDikvVSmOKIHbD8pKlotPEM8mfaISZ71JE",
//   authDomain: "tech-book-web-1eb44.firebaseapp.com",
//   projectId: "tech-book-web-1eb44",
//   storageBucket: "tech-book-web-1eb44.appspot.com",
//   messagingSenderId: "255724477832",
//   appId: "1:255724477832:web:1acea7beb2807f10ed6e3d",
//   measurementId: "G-BCE447YJPC"
// }; // vicheka

// const firebaseConfig = {
//   apiKey: "AIzaSyDPRySF5YuINqNBV58EVvbyOrFw4-qxZwg",
//   authDomain: "tech-book-d3a1f.firebaseapp.com",
//   projectId: "tech-book-d3a1f",
//   storageBucket: "tech-book-d3a1f.appspot.com",
//   messagingSenderId: "537261158794",
//   appId: "1:537261158794:web:2e83d87562444319151873",
//   measurementId: "G-7F44XNQVPR"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCUf2j3nIjRBa9hTu7u71gTOCFES9YHNHw",
  authDomain: "techbooks-6aa5b.firebaseapp.com",
  projectId: "techbooks-6aa5b",
  storageBucket: "techbooks-6aa5b.appspot.com",
  messagingSenderId: "367717926837",
  appId: "1:367717926837:web:3343234c92baecb0c3fbfc",
  measurementId: "G-15HQMK0D9B"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default app;
export const database = getDatabase(app);
export const storage = getStorage();
const db = getFirestore(app);
export {auth, db};

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}