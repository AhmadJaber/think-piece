import React, { createContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../lib/firebase';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log('user', user);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = await createUserProfileDocument(authUser);
        userRef.onSnapshot((snapshot) => {
          console.log('changed');
          setUser({ uid: snapshot.id, ...snapshot.data() });
        });
      } else {
        setUser(authUser);
      }
    });

    return () => {
      console.log('unmounting');
      unsubscribeFromAuth();
    };
  }, [setUser]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
