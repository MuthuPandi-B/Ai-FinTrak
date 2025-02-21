import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionRe

const store = configureStore({
  reducer: {
    auth: authReducer,

  },
});

export default store;
