const { createSlice } = require("@reduxjs/toolkit");

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [
    {
      id: '1',
      user: '1',
      date: new Date().toISOString(),
      message: 'Hello'
    }
  ],
  reducers: {}
});

export const selectAllNotifications = state => state.notifications;

export default notificationsSlice.reducer;
