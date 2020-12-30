import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Authentication from './Authentication';
import PostPage from './PostPage';
import Posts from './Posts';
import UserProfile from './UserProfile';

export default function Application() {
  return (
    <main className='Application'>
      <Link to='/'>
        <h1>Think Piece</h1>
      </Link>

      <Authentication />

      <Switch>
        <Route exact path='/'>
          <Posts />
        </Route>
        <Route exact path='/profile'>
          <UserProfile />
        </Route>
        <Route path='/posts/:id'>
          <PostPage />
        </Route>
      </Switch>
    </main>
  );
}
