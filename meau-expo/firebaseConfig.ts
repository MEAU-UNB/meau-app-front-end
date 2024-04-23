// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUGTryWc9f9heOqZzbcLdF1XbbdbM1Aqs",
  authDomain: "meau-app-2264e.firebaseapp.com",
  projectId: "meau-app-2264e",
  storageBucket: "meau-app-2264e.appspot.com",
  messagingSenderId: "130700464294",
  appId: "1:130700464294:web:ca2b6f70fb898b9ffba467",
  measurementId: "G-3YJ0CJ0Z68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };