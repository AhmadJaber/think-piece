import React, { useContext } from 'react';
import moment from 'moment';
import { firestore } from '../lib/firebase';
import { UserContext } from '../context/UserProvider';
import { belongsToCurrentUser } from '../utils/utils';
import { Link } from 'react-router-dom';

const Post = ({ title, content, user, createdAt, stars, comments, id }) => {
  const currentUser = useContext(UserContext);

  const postRef = firestore.doc(`posts/${id}`);
  const handleRemove = () => postRef.delete();
  const handleStarCount = () => {
    // update(), will take an object of fields, i want to update
    postRef.update({ stars: stars + 1 });
  };

  return (
    <article className='Post'>
      <div className='Post--content'>
        <Link to={`/posts/${id}`}>
          <h3>{title}</h3>
        </Link>
        <div>{content}</div>
      </div>
      <div className='Post--meta'>
        <div>
          <p>
            <span role='img' aria-label='star'>
              ⭐️
            </span>
            {stars}
          </p>
          <p>
            <span role='img' aria-label='comments'>
              🙊
            </span>
            {comments}
          </p>
          <p>Posted by {user.displayName}</p>
          <p>{moment(createdAt.toDate()).calendar()}</p>
        </div>
        <div>
          <button className='star' onClick={handleStarCount}>
            Star
          </button>
          {/* TODO: don't show this if the user not logged in or creator of the post */}
          {belongsToCurrentUser(currentUser, user) ? (
            <button className='delete' onClick={handleRemove}>
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};

Post.defaultProps = {
  title: 'An Incredibly Hot Take',
  content:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.',
  user: {
    id: '123',
    displayName: 'Bill Murray',
    email: 'billmurray@mailinator.com',
    photoURL: 'https://www.fillmurray.com/300/300',
  },
  createdAt: new Date(),
  stars: 0,
  comments: 0,
};

export default Post;
