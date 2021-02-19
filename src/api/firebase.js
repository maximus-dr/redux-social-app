import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_2-yRvNotxxot4__udLihb_hD1DR96gk",
  authDomain: "redux-social-app.firebaseapp.com",
  projectId: "redux-social-app",
  storageBucket: "redux-social-app.appspot.com",
  messagingSenderId: "271353218659",
  appId: "1:271353218659:web:cd4879815b0ee48c031a56"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

const db = firebase.firestore();

export default db;
