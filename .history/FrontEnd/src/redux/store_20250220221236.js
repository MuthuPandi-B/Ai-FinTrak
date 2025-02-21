import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionReducer from './slices/transactionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
  },
});

export default store;
