import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeq3MVWVKxFus7vgPw-Aw2wYHnG5MxmSI",
  authDomain: "ladle-b7de3.firebaseapp.com",
  projectId: "ladle-b7de3",
  storageBucket: "ladle-b7de3.appspot.com",
  messagingSenderId: "1049664544361",
  appId: "1:1049664544361:web:51c4b6f861d1a4e7c84cf8"
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };