import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastWarnNotify = (msg) => {
  toast.warn(msg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide
  });
};

export const toastSuccessNotify = (msg) => {
  toast.success(msg, {
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastErrorNotify = (msg) => {
  toast.error(msg, {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
