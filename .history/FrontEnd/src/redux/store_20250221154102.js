import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transaction

const store = configureStore({
  reducer: {
    auth: authReducer,

  },
});

export default store;
