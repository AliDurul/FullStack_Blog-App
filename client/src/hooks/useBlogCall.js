import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getBloDetLikSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import axios from "axios";
import useAxios from "./useAxios";
import { useNavigate } from "react-router-dom";

const useBlogCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth);


  const { axiosWithToken } = useAxios();

  const getBlog = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}` + "api/blogs/"
      );
      dispatch(getBloDetLikSuccess({ url, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Data can not be Fetched !");
      console.log(error);
    }
  };

  const getCategories = async (url) => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}` + "api/categories/"
      );
      dispatch(getBloDetLikSuccess({ url, data }));
    } catch (error) {
      console.log(error);
    }
  };

  const createBlog = async (newBlog) => {

    const axiosConfig = {
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}` + "api/blogs/",
      data: newBlog, // Data to be sent in the request body
      headers: { Authorization: `Token ${token}` },
    };

    try {
      await axios(axiosConfig);
      toastSuccessNotify("Successfull !");
    } catch (error) {
      toastErrorNotify("Blog have not been created !");
      console.log(error);
    }
  };

  const updateBlog = async (updatedBlog, id) => {
    try {
      await axiosWithToken.put(`api/blogs/${id}/`, updatedBlog);
      getBlogById('blogDetail',id)
      toastSuccessNotify("Updated is Secuccessful !");
    } catch (error) {
      toastErrorNotify("It Could not Updated !")
      console.log(error);
    }
  };

  const getBlogById = async (url, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`api/blogs/${id}/`);
      dispatch(getBloDetLikSuccess({ url, data }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axiosWithToken.delete(`api/blogs/${id}/`);
      toastSuccessNotify("Blog is Deleted Secuccessfully !");
      navigate('/')
    } catch (error) {
      toastErrorNotify("It Could not Deleted !")
      console.log(error);
    }
  };

  const createLike = async (id) => {
    try {
      await axiosWithToken.post(`api/likes/${id}/`);
      getBlog('blogs');
      getBlogById('blogDetail',id)
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (comment, id) => {
    try {
      await axiosWithToken.post(`api/comments/${id}/`, comment);
      getBlogById('blogDetail', id);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserBlog = async (url, userName) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`api/blogs/?author=${userName}`);
      console.log(data);
      dispatch(getBloDetLikSuccess({ url, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Data can not be Fetched !");
      console.log(error);
    }
  };

  return { getBlog, getCategories, createBlog , updateBlog,getBlogById, deleteBlog, createLike, createComment, getUserBlog};
};

export default useBlogCall;
