import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  userInfo: null,
  token: null,
  modalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload?.user;
      state.token = payload?.key;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.token = null;
    },
    registerSuccess: (state,{payload}) => {
      state.loading = false;
      state.userInfo = payload
      state.token = payload?.token
  },
    modal: (state, { payload }) => {
      state.modalOpen = payload;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail, loginSuccess, modal,logoutSuccess, registerSuccess} = authSlice.actions;

export default authSlice.reducer;
