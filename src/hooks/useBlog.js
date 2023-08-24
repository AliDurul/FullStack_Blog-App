import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

import {
  fetchFail,
  fetchStart,
  getBloDetLikSuccess,
} from "../features/blogSlice";
import useAxios from "./useAxios";
import { useNavigate } from "react-router-dom";

const useBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { axiosWithToken, axiosPublic } = useAxios();

  const getBlog = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic("api/blogs/");
      dispatch(getBloDetLikSuccess({ url, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Data can not be Fetched !");
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

  const createLike = async (url, id) => {
    try {
      await axiosWithToken.post(`api/likes/${id}/`);
      getBlog(url);
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (comment, id, url) => {
    try {
      await axiosWithToken.post(`api/comments/${id}/`, comment);
      getBlogById(url, id);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async (url) => {
    try {
      const { data } = await axiosWithToken("api/categories/");
      dispatch(getBloDetLikSuccess({ url, data }));
    } catch (error) {
      console.log(error);
    }
  };

  const createBlog = async (newBlog) => {
    try {
      await axiosWithToken.post("api/blogs/", newBlog);
      toastSuccessNotify("Successfull !");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserBlog = async (url, userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`api/blogs/?author=${userId}`);
      dispatch(getBloDetLikSuccess({ url, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Data can not be Fetched !");
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

  const deleteBlog = async (id) => {
    try {
      await axiosWithToken.delete(`api/blogs/${id}/`);
      toastSuccessNotify("Deleted is Secuccessful !");
      navigate('/')
    } catch (error) {
      toastErrorNotify("It Could not Deleted !")
      console.log(error);
    }
  };
  return {
    getBlog,
    createLike,
    getBlogById,
    createComment,
    getCategories,
    createBlog,
    getUserBlog,
    updateBlog,
    deleteBlog
  };
};

export default useBlog;
