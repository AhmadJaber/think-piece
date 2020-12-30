import React from 'react';
import { useSetState } from '../hooks/useSetState';
import { auth, signInWithGoogle } from '../lib/firebase';

const initialState = {
  email: '',
  password: '',
};

//TODO: enable sign in with google
export default function SignIn() {
  const [state, setState] = useSetState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error.message);
    }

    setState(initialState);
  };

  return (
    <form className='SignIn' onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={state.email}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={state.password}
        onChange={handleChange}
      />
      <input type='submit' value='Sign In' />
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </form>
  );
}
