import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
require("firebase/auth");
require("firebase/database");

// Get a Firestore instance

const firebaseConfig = {
  apiKey: "AIzaSyBMB0WSdQOnDD5XSt2S41eV-4z2-IwzOQk",
  authDomain: "evans-chronicle.firebaseapp.com",
  databaseURL: "https://evans-chronicle.firebaseio.com",
  projectId: "evans-chronicle",
  storageBucket: "evans-chronicle.appspot.com",
  messagingSenderId: "1037180335889",
  appId: "1:1037180335889:web:e3ef3931839766fa167eb0",
  measurementId: "G-798MELJ620",
};

const app = initializeApp(firebaseConfig);

export const db = app.database();
export const mariaRef = db.ref("Maria");

const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
