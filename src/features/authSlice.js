import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  userInfo: null,
  token:null
};




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false
    },
    loginSuccess: (state,{payload}) => {
        state.loading = false;
        state.userInfo = payload?.user
        state.token = payload?.key
    },
    registerSuccess: (state,{payload}) => {
      state.loading = false;
      state.userInfo = payload
      state.token = payload?.token
  },
    logoutSuccess: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.token = null;
    },
    fetchFail: (state) => {
        state.loading = false;
        state.error = true
    }
  },
});

export const {fetchStart,loginSuccess,fetchFail,logoutSuccess,registerSuccess} = authSlice.actions;

export default authSlice.reducer;
