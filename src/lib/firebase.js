import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
console.log(process.env.REACT_APP_API_KEY);
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

// handling google sign in
export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOutGoogle = () => auth.signOut();

if (process.env.NODE_ENV === 'development') {
  console.log(process.env);
  window.firebase = firebase;
}

// create userProfile document, add it to users collection
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  console.log('add data', additionalData);

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
        ...additionalData,
      });
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return userRef;
};

/*
* do not need that if i am live updating
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
*/

export default firebase;

// test locally before upload
// https://think-piece-2e3c0--think-piece-alyutkj4.web.app
