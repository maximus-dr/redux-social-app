import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { selectAllPosts, fetchPosts } from './postsSlice';

export default function PostsList() {

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const orderedPosts = posts.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const postStatus = useSelector(state => state.posts.status);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus]);
  

  const renderPosts = orderedPosts.map(post => (

    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">
        {post.content.substring(0, 100)}
      </p>

      <ReactionButtons post={post} />
      <Link to={`posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderPosts}
    </section>
  )
}
