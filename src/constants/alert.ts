import { Bounce, toast } from "react-toastify";

export const notify = (type: 'success' | 'error' | 'loading' | 'warning' | 'info', content:string) => toast[type](content, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });