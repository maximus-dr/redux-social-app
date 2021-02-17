import React, { useState } from 'react'

export default function AddPostForm() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);

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

        <button>Save Post</button>
      </form>

    </section>
  )
}
