// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection,addDoc,serverTimestamp,query,onSnapshot, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYOjmzwIv1RgOxpXjdo7JPcL-Vf0ZHKQM",
  authDomain: "chat-ebe09.firebaseapp.com",
  projectId: "chat-ebe09",
  storageBucket: "chat-ebe09.appspot.com",
  messagingSenderId: "408309197878",
  appId: "1:408309197878:web:700af8e4110f1d74807c97",
  measurementId: "G-25FJDWB4HL"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
    MESSAGES
};