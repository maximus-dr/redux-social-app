import db from './../../api/firebase';
const { createSlice, nanoid, createAsyncThunk } = require("@reduxjs/toolkit");


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await db.collection('posts').get().then(snapshot => {
    const posts = snapshot.docs.map(doc => doc.data());
    return posts;
  });
  return response;
});


const initialState = {
  posts: [],
  status: 'idle',
  error: null
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0
            }
          }
        }
      }
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});


export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId);

// automaticly generated Action Creators
export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
