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

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({ displayName, email, createdAt, ...additionalData });
		} catch (error) {
			console.error("error creating user", error.message);
		}
	}
	return userRef;
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);
	const batch = firestore.batch();
	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	await batch.commit();
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
