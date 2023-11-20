import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  blogs: [],
  userlikes:[],
  blogDetail: {},
  categories: [],
  userBlogs:[]
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getBloDetLikSuccess : (state,{payload}) => {
      state.loading = false;
      state[payload.url] = payload.data
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart,fetchFail,getBloDetLikSuccess } = blogSlice.actions;

export default blogSlice.reducer;
