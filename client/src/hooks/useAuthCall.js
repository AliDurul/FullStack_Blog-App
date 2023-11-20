import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, modal, registerSuccess } from "../features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

const useAuthCall = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const login = async (userData) => {
    dispatch(fetchStart());

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}` + "users/auth/login/",userData);
      dispatch(loginSuccess(data));
      dispatch(modal(false))
      navigate(-1)
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
      toastErrorNotify('User Credentials are not correct. Please  try again !')
    }
  };

  const logout = async () => {
    dispatch(fetchStart());

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}` + "users/auth/logout/");
      dispatch(logoutSuccess());
      toastSuccessNotify('Logout Successed !')
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify('You could not Logout. Something went wrong.')
      console.log(error);

    }
  };

 const register = async (userData) => {
  dispatch(fetchStart())
    try {
      
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}users/register/`, userData);
      dispatch(registerSuccess(data))
      console.log(data);

      dispatch(modal(false))
      toastSuccessNotify('Register Successfull !')
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify((error?.request ) ? error?.request?.response : error.message )
      console.log(error);
    }
  };


  return { login , logout,register};
};

export default useAuthCall;
