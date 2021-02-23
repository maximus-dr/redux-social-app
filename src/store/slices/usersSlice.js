import db from './../../api/firebase';
const { createSlice, createAsyncThunk, nanoid } = require("@reduxjs/toolkit");


const initialState = [
  {id: '0', name: 'Tatsjana Jerkins'},
  {id: '1', name: 'Kevin Grant'},
  {id: '2', name: 'Madison Price'}
];

export const addNewUser = createAsyncThunk('users/addNewUser', async ({name, lastName}) => {
  const newUser = {
    id: nanoid(),
    name,
    lastName
  }

  await db.collection('users').doc(newUser.id).set({...newUser});
  return newUser;
});

const usersSlice = createSlice({
  name: 'users', 
  initialState,
  reducers: {}
});

export const selectAllUsers = state => state.users;
export const selectUserById = (state, userId) => 
  state.users.find(user => user.id === userId);

export default usersSlice.reducer;
