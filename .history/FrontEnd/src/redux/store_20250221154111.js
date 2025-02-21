import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionReducer from './'

const store = configureStore({
  reducer: {
    auth: authReducer,

  },
});

export default store;
