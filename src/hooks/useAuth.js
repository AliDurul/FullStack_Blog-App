import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess } from "../features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";



const useAuth = () => {
  const dispatch = useDispatch()
  const navigate =  useNavigate()
 
  const login = async (userData) => {
    dispatch(fetchStart())
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}users/auth/login/`, userData);
      dispatch(loginSuccess(data))
      toastSuccessNotify('Login Successfull !')
      navigate(-1)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify('Please Register or try again !')
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}users/auth/logout/`);
      dispatch(logoutSuccess())
      toastSuccessNotify('Logout Successed !')
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify('Something went wrong !')
      console.log(error);
    }
  }

  const register = async (userData) => {
    dispatch(fetchStart())
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}users/register/`, userData);
      dispatch(registerSuccess(data))
      toastSuccessNotify('Register Successfull !')
      navigate('/')
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(error?.request ? error?.request?.response : error.message )
      console.log(error);
    }
  };

  return {login,logout,register};
};

export default useAuth;
