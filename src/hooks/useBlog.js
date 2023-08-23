import { useDispatch } from "react-redux";
import { toastErrorNotify } from "../helper/ToastNotify";
import axios from "axios";
import { fetchFail, fetchStart, getBlogSuccess } from "../features/blogSlice";

const useBlog = () => {
  const dispatch = useDispatch();

  const getBlog = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}api/blogs/`
      );
      dispatch(getBlogSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Data can not be Fetched !");
      console.log(error);
    }
  };

  return { getBlog };
};

export default useBlog;
