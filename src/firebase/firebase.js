// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgsmF2-x4mlPFj5HbCG5e3mjdYB5sSvRE",
  authDomain: "react-todoapp-cadca.firebaseapp.com",
  projectId: "react-todoapp-cadca",
  storageBucket: "react-todoapp-cadca.appspot.com",
  messagingSenderId: "1052352022247",
  appId: "1:1052352022247:web:31d0c43ecf142246814442",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize our Database db
const db = getFirestore(app);

// our db collection
const db_collection = collection(db, "todoCollection");

// iniialize auth object for authentication
const auth = getAuth();
// we export collection and db to App.jsx bcz we need these in that file
export {
  db,
  db_collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
