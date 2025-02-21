import { createSlice } from '@reduxjs/toolkit';

//Load auth state from LocalStorage 
const storedAuth =JSON.parse(localStorage.getItem("authstate"));


const initialState = {
  user: null,
  token:null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  
  reducers: {
    setUser: (state, action) => {
      console.log("Redux: Login Success", action.payload);
      state.user = action.payload;
      state.token=action.payload.token
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
