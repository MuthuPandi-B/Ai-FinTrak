import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  
  reducers: {
    setUser: (state, action) => {
      console.log("Redux: Login Success", action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      
    },
    clearUser: (state) => {
      console.log("Redux: Logout Triggered");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
