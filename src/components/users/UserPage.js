import React from 'react'
import { useSelector } from 'react-redux';
import { selectPostsByUser } from '../../store/slices/postsSlice';
import { selectUserById } from '../../store/slices/usersSlice';
import { Link } from 'react-router-dom';


export default function UserPage({ match }) {

  const { userId } = match.params;

  const user = useSelector(state => selectUserById(state, userId));
  const postsOfUser = useSelector(state => selectPostsByUser(state, userId));

  const postTitles = postsOfUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>
        {post.title}
      </Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
