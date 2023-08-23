import { useDispatch } from "react-redux";
import { toastErrorNotify } from "../helper/ToastNotify";

import {
  fetchFail,
  fetchStart,
  getBloDetLikSuccess,
} from "../features/blogSlice";
import useAxios from "./useAxios";

const useBlog = () => {
  const dispatch = useDispatch();

  const {axiosWithToken,axiosPublic} = useAxios()


  const getBlog = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic('api/blogs/');
      dispatch(getBloDetLikSuccess({url,data}));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Data can not be Fetched !");
      console.log(error);
    }
  };

  const getBlogById = async (url,id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`api/blogs/${id}/`);
      dispatch(getBloDetLikSuccess({url,data}));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const createLike = async (url,id) => {
    try {
     const {data} = await axiosWithToken.post(`api/likes/${id}/`);
     dispatch(getBloDetLikSuccess({url,data}));
    } catch (error) {
      console.log(error);
    }
  };
  const readLike = async (url,id) => {
    try {
     const {data} = await axiosWithToken(`api/likes/${id}/`);
     dispatch(getBloDetLikSuccess({url,data}));
    } catch (error) {
      console.log(error);
    }
  };

  return { getBlog, createLike,getBlogById,readLike };
};

export default useBlog;
