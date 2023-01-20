  import {
     toast
  } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  export const CreateAlert = (type, msg) => {

     if (type === '') {
        return toast(msg)
     }
     if (type === 'error') {
        return toast[type](msg)
     }
     if (type === 'info') {
        return toast[type](msg)
     }
     if (type === 'success') {
        return toast[type](msg)
     }
     if (type === 'warn') {
        return toast[type](msg)
     }


  }