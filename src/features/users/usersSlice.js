const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
  {id: '0', name: 'Tatsjana Jerkins'},
  {id: '1', name: 'Kevin Grant'},
  {id: '2', name: 'Madison Price'}
];

const usersSlice = createSlice({
  name: 'users', 
  initialState,
  reducers: {}
});

export default usersSlice.reducer;
