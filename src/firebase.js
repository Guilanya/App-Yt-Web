// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase (obtén esta configuración desde tu proyecto en Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyBUPLeTZvuftf6--9pRWrnecfbj65hX59s",
    authDomain: "app-yt-web.firebaseapp.com",
    projectId: "app-yt-web",
    storageBucket: "app-yt-web.firebasestorage.app",
    messagingSenderId: "448390955921",
    appId: "1:448390955921:web:eb21d7d10d37d727085030",
    measurementId: "G-DJ4F0SPXXH"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta los objetos
export { auth, db };
