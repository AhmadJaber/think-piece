import React from 'react';
import { auth, firestore } from '../lib/firebase';
import { useSetState } from '../hooks/useSetState';

const initalState = {
  title: '',
  content: '',
};

export default function AddPost() {
  const [state, setState] = useSetState(initalState);
  const { uid, displayName, email, photoURL } = auth.currentUser || {};
  // console.log(state);
  // console.log('add user', user);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { content, title } = state;
    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date(),
    };

    firestore.collection('posts').add(post);

    clear();
  };

  const clear = () => {
    setState(initalState);
  };

  return (
    <form onSubmit={handleSubmit} className='AddPost'>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={state.title}
        onChange={handleChange}
        // required
      />
      <input
        type='text'
        name='content'
        placeholder='Body'
        value={state.content}
        onChange={handleChange}
        required
      />
      <input className='create' type='submit' value='Create Post' />
    </form>
  );
}

/**
 * ? handling form state-management with useRef()
 export default function AddPost({ onCreate }) {
  const titleRef = useRef('');
  const contentRef = useRef('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(titleRef.current.value);
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (!title || !content) {
      console.log('empty form');
      return;
    }

    const post = {
      id: Date.now().toString(),
      title,
      content,
      user: {
        uid: '1111',
        displayName: 'Steve Kinney',
        email: 'steve@mailinator.com',
        photoURL: 'http://placekitten.com/g/200/200',
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date(),
    };

    onCreate(post);

    contentRef.current.value = '';
    titleRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className='AddPost'>
      <input type='text' name='title' placeholder='Title' ref={titleRef} />
      <input type='text' name='content' placeholder='Body' ref={contentRef} />
      <input className='create' type='submit' value='Create Post' />
    </form>
  );
}
 */
