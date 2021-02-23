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

export const selectAllUsers = state => state.users;
export const selectUserById = (state, userId) => 
  state.users.find(user => user.id === userId);

export default usersSlice.reducer;
