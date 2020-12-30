import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { firestore } from '../lib/firebase';
import { collectIdAndData } from '../utils/utils';
import Comments from './Comments';
import Post from './Post';

export default function PostPage() {
  const user = useContext(UserContext);
  const { params } = useRouteMatch();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const postRef = firestore.doc(`posts/${params.id}`);
  const commentsRef = postRef.collection(`/comments`);
  console.log('comments', comments);

  useEffect(() => {
    const unsubscribeFromPost = postRef.onSnapshot((snapshot) => {
      const post = collectIdAndData(snapshot);
      setPost(post);
    });

    const unsubscribeFromComments = commentsRef.onSnapshot((snapshot) => {
      const comments = snapshot.docs.map(collectIdAndData);
      setComments(comments);
    });

    return () => {
      unsubscribeFromPost();
      unsubscribeFromComments();
    };
  }, []);

  const createComment = (comment) => {
    const createdAt = new Date();
    commentsRef.add({ ...comment, user, createdAt });
  };

  return (
    <section>
      {post ? <Post {...post} /> : null}
      <Comments comments={comments} onCreate={createComment} />
    </section>
  );
}
