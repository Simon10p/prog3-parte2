import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD3AKKvWSBqi3iYJKVxFRUU_Vc0fH2f6eM",
  authDomain: "datos-proyecto-73f61.firebaseapp.com",
  projectId: "datos-proyecto-73f61",
  storageBucket: "datos-proyecto-73f61.appspot.com",
  messagingSenderId: "1050884407700",
  appId: "1:1050884407700:web:dabfdfafeb5b31d1d58f81"
};
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
