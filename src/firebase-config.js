// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCJR8AAmhYbIfyD1PeAY0ZniZpB27e974I",
  authDomain: "loving-you-1e8eb.firebaseapp.com",
  projectId: "loving-you-1e8eb",
  storageBucket: "loving-you-1e8eb.appspot.com",
  messagingSenderId: "926970434627",
  appId: "1:926970434627:web:d66afedbcf7bb23e41f0f6",
  measurementId: "G-ME7PV4TDX4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;
