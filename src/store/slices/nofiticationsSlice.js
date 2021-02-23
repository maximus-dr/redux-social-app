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

export const allNotificationsRead = createAsyncThunk('notifications/allNotificationsRead', async (notifications) => {
  await notifications.forEach(notification => {
    
    db.collection('notifications')
      .doc(`${notification.id}`)
      .update({ isRead: true })
  })
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationsRefreshed(state, action) {
      state.list = [];
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
      state.list.sort((a, b) => b.date.localeCompare(a.date));
    },
    [allNotificationsRead.fulfilled]: (state, action) => {
      state.list.forEach(notification => {
        notification.isRead = true;
      });
    }
  }
});

export const selectAllNotifications = state => state.notifications.list;

export const { notificationsRefreshed } = notificationsSlice.actions;

export default notificationsSlice.reducer;
