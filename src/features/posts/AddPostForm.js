import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';


export default function AddPostForm() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  const users = useSelector(state => state.users);

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  }

  return (
    <section>
      <h2>Add a new Post</h2>

      <form>
        <label htmlFor="postTitle">Post Title: </label>
        <input 
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postContent">Content: </label>
        <textarea 
          name="postContent" 
          id="postContent" 
          value={content}
          onChange={onContentChanged} 
        />

        <label htmlFor="postAuthor">Author: </label>
        <select 
          name="postAuthor" 
          id="postAuthor" 
          value={userId} 
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <button 
          className="button" 
          type="button" 
          onClick={onSavePostClicked} 
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>

    </section>
  )
}
