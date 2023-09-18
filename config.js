import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDAOSH0NPRM2QX3hDp4g8uTiUxqQJOetPQ",
  authDomain: "eagv-backfront.firebaseapp.com",
  projectId: "eagv-backfront",
  storageBucket: "eagv-backfront.appspot.com",
  messagingSenderId: "875002850213",
  appId: "1:875002850213:web:df842b6f866f580cf9d64c"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const User = db.collection('Users')

module.exports = User