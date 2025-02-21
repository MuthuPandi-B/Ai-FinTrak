import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  selectedTransaction: null, // New state to store selected transaction
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter((t) => t._id !== action.payload);
    },
    setSelectedTransaction:(state,action)=>{
      console.log("Redux:")
      state.selectedTransaction=action.payload;
    },
  },
});

export const { setTransactions, addTransaction, updateTransaction, deleteTransaction,setSelectedTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
