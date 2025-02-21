import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionReducer from './transactionSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions:tra

  },
});

export default store;
