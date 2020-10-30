import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDRc25AzFnX_gQlRVHgikZqu6IOBxCwyu8",
  authDomain: "crwn-db-56c46.firebaseapp.com",
  databaseURL: "https://crwn-db-56c46.firebaseio.com",
  projectId: "crwn-db-56c46",
  storageBucket: "crwn-db-56c46.appspot.com",
  messagingSenderId: "565620703583",
  appId: "1:565620703583:web:a023feb98799c1b0f176ea",
  measurementId: "G-HXPVTYMQJG",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
