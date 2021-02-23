import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import { selectPostById } from '../../store/slices/postsSlice';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';


function Post({ postId }) {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export default React.memo(Post);
