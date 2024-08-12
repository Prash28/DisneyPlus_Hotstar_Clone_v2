import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD7mNeMkK31tO8C5UdhF5MRz__CvphA3z4",
  authDomain: "disney-plus-clone-409b3.firebaseapp.com",
  projectId: "disney-plus-clone-409b3",
  storageBucket: "disney-plus-clone-409b3.appspot.com",
  messagingSenderId: "1008366074864",
  appId: "1:1008366074864:web:7d17aa1c10c3433e223b35",
  measurementId: "G-RXZLREHKL7"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth, provider, storage};
  export default db;