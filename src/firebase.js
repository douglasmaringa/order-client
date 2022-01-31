import firebase from "firebase";
const firebaseConfig = {
    //Put your config file here
    apiKey: "AIzaSyC_lBsxFmAMYbNs2-5mQ8Hq3sn-a7uw74A",
  authDomain: "food-45d6f.firebaseapp.com",
  projectId: "food-45d6f",
  storageBucket: "food-45d6f.appspot.com",
  messagingSenderId: "513743757882",
  appId: "1:513743757882:web:705d461b6e4df58ab14b03",
  measurementId: "G-XT9Q2S1T9C"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };