import React, { useState, useRef } from 'react';
import { auth, firestore, storage } from '../lib/firebase';

export default function UserProfile() {
  const [displayName, setDisplayName] = useState('');
  const imageRef = useRef(null);

  const handleChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uid = auth.currentUser ? auth.currentUser.uid : null;
    const userDocumentRef = firestore.doc(`users/${uid}`);
    const imgFile = imageRef.current && imageRef.current.files[0];

    if (displayName) {
      userDocumentRef.update({ displayName });
      setDisplayName('');
    }

    if (imgFile) {
      /*
      storage.ref() top of the storage-bucket
      we will have a folder for each user, based on there with id.
      storage has security rules, so we can use the rules to set that
      a user can only access the folder which created based on the user id.

      * so we uploaded a image and saved in the firebase storage-bucket &
      * repalce the photoURL field in firestore user-document
      */
      storage
        .ref()
        .child('user-profiles')
        .child(uid)
        .child(imgFile.name)
        .put(imgFile)
        .then((response) => {
          console.log(response);
          return response.ref.getDownloadURL();
        })
        .then((photoURL) => userDocumentRef.update({ photoURL }))
        .catch((error) => console.error(error.message));

      imageRef.current.value = '';
    }
  };

  return (
    <>
      {auth.currentUser ? (
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
      ) : null}
    </>
  );
}
