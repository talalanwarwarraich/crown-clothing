import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyDjj6RSGYsYpzLY2EVL6G0Hc77Z_-tFLuE",
	authDomain: "crown-clothing-70293.firebaseapp.com",
	projectId: "crown-clothing-70293",
	storageBucket: "crown-clothing-70293.appspot.com",
	messagingSenderId: "252837897849",
	appId: "1:252837897849:web:c5deaea6dc464834ac56a8",
	measurementId: "G-Q0NCJGJ6TG",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
