import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCtoRDwYKYQnRw208dBj9V16H7I6EE0CcA",
    authDomain: "datos-proyecto-3ac31.firebaseapp.com",
    projectId: "datos-proyecto-3ac31",
    storageBucket: "datos-proyecto-3ac31.appspot.com",
    messagingSenderId: "9519674896",
    appId: "1:9519674896:web:dbb3090f5fb1cc9d68fc95"
  };
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
