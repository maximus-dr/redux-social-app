import db from './../../api/firebase';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async () => {
  const response = await db.collection('notifications').get().then(snapshot => {
    const notifications = snapshot.docs.map(doc => doc.data());
    return notifications;
  });

  return response;
});

const initialState = {
  list: [],
  status: 'idle',
  error: null
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.list = state.list.concat(action.payload);
    }
  }
});

export const selectAllNotifications = state => state.notifications.list;

export default notificationsSlice.reducer;
