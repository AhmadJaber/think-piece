import React, { useEffect, useState } from 'react';
import { auth, createUserProfileDocument, firestore } from '../lib/firebase';
import { collectIdAndData } from '../utils/utils';
import Authentication from './Authentication';
import Posts from './Posts';

export default function Application() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  /*
    * to enable, realtime update with cloud firestore
    means, when the database changes firebase will tell me about it & i will update the ui
    * i have to use onSnapshot() instead of get(). onSnapshot() will take a callback,
    * which will run everytime the data changes.
    so every time whatever the scope of query in this case all posts, i can limit it. so, anytime
    that data sets changes we get a new snapshot, so that we can update the user interfece. each
    change count as a database query, need to keep in mind.
    * when the app mounts we subscribe to the changes of post collections, when unmounts we have to
    unsubscribe.
  */
  useEffect(() => {
    let unsubscribeFromFirestore = null;

    async function getPostSnapshot() {
      unsubscribeFromFirestore = firestore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          console.log('changed');
          const posts = snapshot.docs.map(collectIdAndData);
          setPosts(posts);
        });
    }

    getPostSnapshot();

    return () => {
      unsubscribeFromFirestore();
    };
  }, []);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async (authUser) => {
      const user = await createUserProfileDocument(authUser);
      console.log('currentuser', user);
      setUser(user);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <main className='Application'>
      <h1>Think Piece</h1>
      <Authentication user={user} />
      <Posts posts={posts} />
    </main>
  );
}

// using querysnapshot.forEach(), return a object of objects(docs)
/*
  useEffect(() => {
    async function getPostSnapshot() {
      const snapshot = await firestore.collection('posts').get();
      const fullObj = {};

      console.log(snapshot);
      snapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();

        fullObj[id] = { id, data };
      });
      console.log(fullObj);
    }

    getPostSnapshot();
  }, []);
*/

// using querysnapshot.forEach(), return a object of objects(docs)
/*
  const posts = snapshot.docs.reduce((accm, doc) => {
    return { ...accm, [doc.id]: { id: doc.id, data: doc.data() } };
  }, {});
*/

/**
  const posts = snapshot.docs.reduce((accm, doc) => {
    return Object.assign(accm, {
      [doc.id]: { id: doc.id, data: doc.data() },
    });
  }, {});
*/

/**
  const posts = snapshot.docs.reduce((accm, doc) => {
    accm[doc.id] = { id: doc.id, data: doc.data() };
    return accm;
  }, {});
*/
