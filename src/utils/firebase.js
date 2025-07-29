// src/utils/firebase.js

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- Client (User-facing) Firebase Project ---
const clientConfig = {
  apiKey: "AIzaSyBME917yWL-BKCRDkc_8hlS_Js3MEeypg4",
  authDomain: "netflixgpt-3b5bf.firebaseapp.com",
  projectId: "netflixgpt-3b5bf",
  storageBucket: "netflixgpt-3b5bf.appspot.com", // FIXED: previously incorrect
  messagingSenderId: "758562312382",
  appId: "1:758562312382:web:7c75261a3ca27e0ab1ceef",
};

// --- Admin Firebase Project ---
const adminConfig = {
  apiKey: "AIzaSyBbvENafT4Ey6GKHa_9TWLWFheq-SD4Po4",
  authDomain: "netflix-admin-a4372.firebaseapp.com",
  projectId: "netflix-admin-a4372",
  storageBucket: "netflix-admin-a4372.appspot.com", // FIXED: previously incorrect
  messagingSenderId: "405967106355",
  appId: "1:405967106355:web:3baabd0a101da16e7d8e46",
  measurementId: "G-9WLM0WN76E",
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
