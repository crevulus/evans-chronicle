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

const getHomeImages = async function(collection) {
  // instead of using promises/thens
  let snapshot = await db
    .collection(collection)
    .orderBy("timestamp", "desc")
    .limit(1)
    .get();
  let firstPicturesData;
  snapshot.forEach((doc) => {
    let appData = doc.data();
    appData.id = doc.id;
    firstPicturesData = appData;
  });
  return firstPicturesData;
};

const getFamilyImages = async function(collection) {
  // instead of using promises/thens
  let picturesData = [];
  let snapshot = await db
    .collection(collection)
    .orderBy("timestamp", "desc")
    .get();
  snapshot.forEach((doc) => {
    let appData = doc.data();
    appData.id = doc.id;
    picturesData.push(appData);
  });
  return picturesData;
};

const { Timestamp, GeoPoint } = firebase.firestore;

export { db, fb, Timestamp, GeoPoint, getHomeImages, getFamilyImages };
