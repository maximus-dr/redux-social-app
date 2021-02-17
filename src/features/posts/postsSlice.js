const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
  { id: '1', title: 'First post!', content: 'Hello' },
  { id: '2', title: 'Second post!', content: 'More text' }
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find(post => post.id === id);

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    }
  }
});

// automaticly generated Action Creators
export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;
