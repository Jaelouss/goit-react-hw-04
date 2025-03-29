import toast from 'react-hot-toast';

const toastOptions = {
  position: 'top-right',
  style: {
    border: '2px solid red',
  },
};

export const notify = (state, message) =>
  toast[state](message, { ...toastOptions });

/*
State:
success
error
loading
*/
