import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCEeFxmQ7DyB23ErkGG-jjmH4QwjsVad0A',
  authDomain: 'think-piece-2e3c0.firebaseapp.com',
  projectId: 'think-piece-2e3c0',
  storageBucket: 'think-piece-2e3c0.appspot.com',
  messagingSenderId: '552767085845',
  appId: '1:552767085845:web:3ae7184766ae34d405dd1c',
  measurementId: 'G-G8DGGLF63X',
};
// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

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

export default firebase;
