import React, { useContext } from 'react';
import Post from './Post';
import AddPost from './AddPost';
import { PostContext } from '../context/PostsProvider';
import { UserContext } from '../context/UserProvider';

const Posts = () => {
  const posts = useContext(PostContext);
  const user = useContext(UserContext);

  return (
    <section className='Posts'>
      {user ? <AddPost user={user} /> : null}
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;
