import React, { useState } from 'react';
import { initalState } from '../fixtures/inital-state';
import Posts from './Posts';

export default function Application() {
  const [posts, setPosts] = useState(initalState);

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
