import firebase from 'firebase'

import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyBlKIpGwTWIl5eebJauRILbPBG3kYurE7k",
  authDomain: "react-native-firebase-1629b.firebaseapp.com",
  projectId: "react-native-firebase-1629b",
  storageBucket: "react-native-firebase-1629b.appspot.com",
  messagingSenderId: "526493588029",
  appId: "1:526493588029:web:7dc03d911cd76137af6854"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default {
  firebase,
  db
}