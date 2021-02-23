import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './slices/postsSlice';
import usersReducer from './slices/usersSlice';
import notificationsReducer from './slices/nofiticationsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer
  }
}); 
