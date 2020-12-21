import React, { createContext, useEffect, useState } from "react";
import { firestore } from "../lib/firebase";
import { collectIdAndData } from "../utils/utils";

export const PostContext = createContext();

export default function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

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
        .collection("posts")
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          console.log("changed");
          const posts = snapshot.docs.map(collectIdAndData);
          setPosts(posts);
        });
    }

    getPostSnapshot();

    return () => {
      unsubscribeFromFirestore();
    };
  }, []);

  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
}
