import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotifications } from '../../store/slices/nofiticationsSlice';
import { selectAllPosts, fetchPosts } from '../../store/slices/postsSlice';
import Post from './Post';


export default function PostsList() {

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
      dispatch(fetchNotifications());
    }
  }, [dispatch, postStatus]);

  let content;

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    // Sort posts in reserve chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));

    content = orderedPosts.map(post => (
      <Post key={post.id} postId={post.id} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
