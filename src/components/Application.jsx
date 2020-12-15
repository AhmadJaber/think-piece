import React, { useEffect, useState } from 'react';
import { initalState } from '../fixtures/inital-state';
import { firestore } from '../lib/firebase';
import Posts from './Posts';

export default function Application() {
  const [posts, setPosts] = useState(initalState);

  useEffect(() => {
    const data = firestore.collection('posts').get();
    console.log(data);
  }, []);

  const handleCreate = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <main className='Application'>
      <h1>Think Piece</h1>
      <Posts posts={posts} onCreate={handleCreate} />
    </main>
  );
}
