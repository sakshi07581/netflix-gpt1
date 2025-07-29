// src/utils/firebase.js

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- Client (User-facing) Firebase Project ---
const clientConfig = {
  apiKey: "AIzaSyCddVGkLoHu7aqM7OBknWk86lJUCmoA2Lw",
  authDomain: "netflix-gpt-85ea6.firebaseapp.com",
  projectId: "netflix-gpt-85ea6",
  storageBucket: "netflix-gpt-85ea6.firebasestorage.app",
  messagingSenderId: "1058173531839",
  appId: "1:1058173531839:web:f95006f1030e01090b380a",
  measurementId: "G-HZE85Q3FC5"
};

// --- Admin Firebase Project ---
const adminConfig = {
  apiKey: "AIzaSyDnGzy0ZXamNc1p06INZp_vPLEPzjpBNSw",
  authDomain: "netflix-admin-6a8a4.firebaseapp.com",
  projectId: "netflix-admin-6a8a4",
  storageBucket: "netflix-admin-6a8a4.firebasestorage.app",
  messagingSenderId: "1072706580304",
  appId: "1:1072706580304:web:45cbf8aa08b16c95f54655",
  measurementId: "G-WCWTJQT1L4"
};

// --- Initialize or retrieve apps ---
const clientApp =
  getApps().find((app) => app.name === "clientApp") ??
  initializeApp(clientConfig, "clientApp");

const adminApp =
  getApps().find((app) => app.name === "adminApp") ??
  initializeApp(adminConfig, "adminApp");

// --- Export Auth instances separately ---
export const clientAuth = getAuth(clientApp);
export const adminAuth = getAuth(adminApp);

export const db = getFirestore(adminApp);
