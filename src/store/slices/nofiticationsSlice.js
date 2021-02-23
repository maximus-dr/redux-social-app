import db from './../../api/firebase';
const { createSlice, createAsyncThunk, nanoid } = require("@reduxjs/toolkit");


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

export const addNotification = createAsyncThunk('notifications/addNotification', async (post) => {
  const newNotification = {
    id: nanoid(),
    date: new Date().toISOString(),
    isRead: false,
    user: post.user,
    message: post.content
  }

  await db.collection('notifications').doc(newNotification.id).set({...newNotification});
  return newNotification;
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
        notifications.isRead = true;
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
      state.list.push(...action.payload);
      state.list.sort((a, b) => b.date.localeCompare(a.date));
    },
    [addNotification.fulfilled]: (state, action) => {
      state.list.push(action.payload);
    }
  }
});

export const selectAllNotifications = state => state.notifications.list;

export const { notificationsRefreshed, allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
