import { toast } from 'react-toastify';

export const showErrorToast = (message) => {

  toast.error(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export const showSuccessToast = (message) => {

  toast.success(message, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};
