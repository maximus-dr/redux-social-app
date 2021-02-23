import db from '../../api/firebase';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


const initialState = {
  list: [],
  status: 'idle',
  error: null
};

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async () => {
  const response = await db.collection('notifications').get().then(snapshot => {
    const notifications = snapshot.docs.map(doc => doc.data());
    return notifications;
  });

  return response;
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationsRefreshed(state, action) {
      state.list = [];
    },
    allNotificationsRead(state, action) {
      state.list.forEach(notifications => {
        notifications.read = true;
      })
    }
  },
  extraReducers: {
    [fetchNotifications.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.list = [];
      state.list.forEach(notification => {
        notification.isNew = !notification.read;
      });
      state.list.push(...action.payload);
      state.list.sort((a, b) => b.date.localeCompare(a.date));
    }
  }
});

export const selectAllNotifications = state => state.notifications.list;

export const { notificationsRefreshed, allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
