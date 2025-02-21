import { configureStore } from '@reduxjs/toolkit';
import authReducer from './';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
