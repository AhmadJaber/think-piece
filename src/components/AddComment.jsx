import React, { useState } from 'react';

export default function AddComment({ onCreate }) {
  const [comment, setComment] = useState({ content: '' });

  const handleChange = (event) => {
    setComment({ content: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(comment);

    setComment({ content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className='AddComment'>
      <input
        type='text'
        name='content'
        placeholder='Comment'
        value={comment.content}
        onChange={handleChange}
      />
      <input className='create' type='submit' value='Create Comment' />
    </form>
  );
}
