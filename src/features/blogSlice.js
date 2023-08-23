import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  blogs: [],
  blogDetail: {},
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogs = payload;
    },
    getDetailSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogDetail = payload;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getBlogSuccess, fetchFail,getDetailSuccess } = blogSlice.actions;

export default blogSlice.reducer;
