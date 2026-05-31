import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import usersReducer from './slices/usersSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});
