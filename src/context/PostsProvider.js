import React, { createContext, Component } from "react";
import { firestore } from "../lib/firebase";
import { collectIdAndData } from "../utils/utils";

export const PostContext = createContext();

class PostsProvider extends Component {
  state = {
    posts: []
  };

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        console.log("changed");
        const posts = snapshot.docs.map(collectIdAndData);
        this.setState({ posts });
      });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { posts } = this.state;
    const { children } = this.props;

    return (
      <PostContext.Provider value={posts}>{children}</PostContext.Provider>
    );
  }
}

export default PostsProvider;
