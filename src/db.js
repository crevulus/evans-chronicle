import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";

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

initializeApp(firebaseConfig);

const db = firebase.firestore();

// const mariaCollection = db.collection("Maria");

// const { Timestamp, GeoPoint } = firebase.firestore;

// const store = {
//   pictures: null,
// };

// async function getData() {
//   await mariaCollection.onSnapshot((mariaRef) => {
//     const data = [];
//     mariaRef.forEach((doc) => {
//       const instance = doc.data();
//       instance.id = doc.id;
//       data.push(instance);
//     });
//     store.pictures = data;
//     console.log("db " + store.pictures);
//   });
//   return store;
// }

// export { getData, mariaCollection, db, Timestamp, GeoPoint, store };

export { db };
