import { sub } from "date-fns";

const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = [
  { 
    id: '1', 
    title: 'First post!', 
    content: 'Hello', 
    user: '0', 
    date: sub(new Date(), {minutes: 10}).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0
    } 
  },
  { 
    id: '2', 
    title: 'Second post!', 
    content: 'More text', 
    user: '1', 
    date: sub(new Date(), {minutes: 5}).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0
    } 
  }
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
            user: userId,
            date: new Date().toISOString()
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
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  }
});

// automaticly generated Action Creators
export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
