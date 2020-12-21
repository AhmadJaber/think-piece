import React, { Component } from "react";
import Authentication from "./Authentication";
import Posts from "./Posts";

class Application extends Component {
  render() {
    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication />
        <Posts />
      </main>
    );
  }
}

export default Application;

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
