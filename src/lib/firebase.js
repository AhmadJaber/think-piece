import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCEeFxmQ7DyB23ErkGG-jjmH4QwjsVad0A",
  authDomain: "think-piece-2e3c0.firebaseapp.com",
  projectId: "think-piece-2e3c0",
  storageBucket: "think-piece-2e3c0.appspot.com",
  messagingSenderId: "552767085845",
  appId: "1:552767085845:web:3ae7184766ae34d405dd1c",
  measurementId: "G-G8DGGLF63X"
};
// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

// handling google sign in
export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOutGoogle = () => auth.signOut();

if (process.env.NODE_ENV === "development") {
  console.log(process.env);
  window.firebase = firebase;
}

// create userProfile document, add it to users collection
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  console.log("add data", additionalData);

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = userAuth;
    const createdAt = new Date();

    // i didn't use add() here because, if we call add() it will generate a uid for us
    // but we allready have the uid of the user, so now i found the location the document
    // should be, now i want to set it.
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }

  return getUserDocument(userAuth.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    const userSnapshot = await firestore
      .collection("users")
      .doc(uid)
      .get();

    return {
      uid,
      ...userSnapshot.data()
    };
  } catch (error) {
    console.error("error fetching user", error.message);
  }
};

export default firebase;
