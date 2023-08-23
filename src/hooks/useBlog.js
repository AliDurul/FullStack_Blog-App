import { useDispatch } from "react-redux";
import { toastErrorNotify } from "../helper/ToastNotify";
import axios from "axios";
import {
  fetchFail,
  fetchStart,
  getBlogSuccess,
  getDetailSuccess,
} from "../features/blogSlice";
import useAxios from "./useAxios";

const useBlog = () => {
  const dispatch = useDispatch();

  const {axiosWithToken,axiosPublic} = useAxios()


  const getBlog = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic('api/blogs/');
      dispatch(getBlogSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Data can not be Fetched !");
      console.log(error);
    }
  };

  const getBlogById = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`api/blogs/${id}/`);
      dispatch(getDetailSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const createLike = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}api/likes/${id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return { getBlog, createLike,getBlogById };
};

export default useBlog;
