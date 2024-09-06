import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnH_2JSy9v3q5m1-nAz2iLhw445XT6eo8",
  authDomain: "thammenha.firebaseapp.com",
  projectId: "thammenha",
  storageBucket: "thammenha.appspot.com",
  messagingSenderId: "409579147653",
  appId: "1:409579147653:web:7404badb201286cdbe34ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); // Get Database instance
export const auth = getAuth(app); // Get the Auth service

export { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile }; // Export the functions

// Firestore Data Structure

// /users (collection)
//   /{UserID} (document)
//     /user_reports (subcollection)
//       /{ReportID} (document)
//         - brand: (string)
//         - data: (array of objects) [
//           {
//             year: (number),
//             data: (array)
//           }
//         ]
//         - dataset: (string)
//         - dateSaved: (timestamp)
//         - visualization: (string)
  