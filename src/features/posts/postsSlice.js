const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
  { id: '1', title: 'First post!', content: 'Hello' },
  { id: '2', title: 'Second post!', content: 'More text' }
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}
});

export default postSlice.reducer;
