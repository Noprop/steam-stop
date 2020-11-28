import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCdjnBKt1uXrJZHiQcH4JGUNcuN88jqvtQ",
  authDomain: "steam-stop.firebaseapp.com",
  databaseURL: "https://steam-stop.firebaseio.com",
  projectId: "steam-stop",
  storageBucket: "steam-stop.appspot.com",
  messagingSenderId: "837369691163",
  appId: "1:837369691163:web:5898435137c592b79f0cbe"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
