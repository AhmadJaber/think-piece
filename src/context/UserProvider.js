import React, { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "../lib/firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
      const user = await createUserProfileDocument(authUser);
      console.log("currentuser", user);
      setUser(user);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [setUser]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
