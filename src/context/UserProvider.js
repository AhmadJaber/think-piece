import React, { createContext, Component } from "react";
import { auth, createUserProfileDocument } from "../lib/firebase";

export const UserContext = createContext();

class UserProvider extends Component {
  state = {
    user: null
  };

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
      const user = await createUserProfileDocument(authUser);
      console.log("currentuser", user);
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
