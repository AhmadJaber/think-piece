import React, { useState, useRef } from 'react';
import { auth, firestore } from '../lib/firebase';

export default function UserProfile() {
  const [displayName, setDisplayName] = useState('');
  const uid = auth.currentUser ? auth.currentUser.uid : null;
  const imageRef = useRef(null);

  const handleChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDocumentRef = firestore.doc(`users/${uid}`);

    if (displayName) {
      userDocumentRef.update({ displayName });
      setDisplayName('');
    }
  };

  return (
    <section className='userProfile'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='displayName'
          onChange={handleChange}
          placeholder='your display name'
          value={displayName}
        />
        <input type='file' ref={imageRef} />
        <input type='submit' className='update' />
      </form>
    </section>
  );
}
