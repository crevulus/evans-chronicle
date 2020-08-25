import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

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

const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, fb };
