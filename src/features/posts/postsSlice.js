const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = [
  { id: '1', title: 'First post!', content: 'Hello' },
  { id: '2', title: 'Second post!', content: 'More text' }
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId
          }
        }
      }
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
