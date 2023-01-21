import {
  CreateAlert
} from './../../helper/alertMsg';
import axios from 'axios'
import {
  USER_LOGIN,
  USER_LOG_OUT,
  USER_REGISTER
} from './actionTypes';
import { LOADER_END, LOADER_START } from './../loader/actionTypes';



export const UserRegistration = (data, navigate, e) => async (dispatch) => {
  try {
    dispatch({type:LOADER_START})
    await axios({
      method: 'POST',
      url: '/api/v1/users/register',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then(res => {
      if (res.status === 200) {
        dispatch({type:LOADER_END})
        dispatch({
          type: USER_REGISTER
        })
        e.target.reset()
        navigate('/account-verification')
      }
    }).catch(err => {
      dispatch({type:LOADER_END})
      if (err.response.status === 401) {
        CreateAlert('error', err.response.data.message);
        navigate('/account-verification')
      } else {
        CreateAlert('error', err.response.data.message);
      }
    })
  } catch (error) {
    CreateAlert('error', error.response.data.message);
  }
}


//  User Login Action 
export const UserLogin = (data, navigate, e) => async (dispatch) => {
  try {
    dispatch({type:LOADER_START})
    await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then(res => {
      if (res.status === 200) {
        dispatch({type:LOADER_END})
        CreateAlert('success', res.data.message);
        dispatch({
          type: USER_LOGIN,
          payload:res.data.loginUser
        })
        e.target.reset()
        navigate('/')
      }
    })

  } catch (error) {
     dispatch({type:LOADER_END})
     CreateAlert('error', error.response.data.message)
  }
}


//  keep logged in
export const KeepLoggedIn = (cookies,token) => async (dispatch) => {
 
try {
    dispatch({type:LOADER_START})
    await axios({
      method: 'GET',
      url: '/api/v1/users/me',
      withCredentials: true,
      headers: {
        'authorization': 'Bearer ' + token
      }
    }).then( res => {
      if (res.status === 200) {
        dispatch({type:LOADER_END})
        dispatch({
          type: USER_LOGIN,
          payload:res.data.loginUser
        })  
      }
    })
    
  } catch (error) {
    dispatch({type:LOADER_END})
    cookies.remove('ffbtoken')
    dispatch({ type:USER_LOG_OUT})
  }
  
}


//  LogOut Action 
export const LogOutAction = (Cookies, navigate) => (dispatch) => {
   dispatch({type:LOADER_START})
   Cookies.remove('ffbtoken')
   Cookies.remove('access_token')
   navigate('/')
   dispatch({ type:USER_LOG_OUT})
   dispatch({type:LOADER_END})
}


//Forgot password action
export const ForgotPasswordAction = (otp, auth, navigate) => async (dispatch) => {
    try {
      dispatch({type:LOADER_START})
       await axios({
          method: 'POST',
          url: '/api/v1/users/reset-user-password-request',
          headers:{
            'Content-Type': 'application/json' 
          },
          data: {
             otp: otp,
             auth: auth
          }
       }).then ( res => {
          if(res.status === 200) {
            dispatch({type:LOADER_END})
            navigate('/reset-user-password')
          } 
       })
    } catch (error) {
       dispatch({type:LOADER_END})
       CreateAlert('error', error.response.data.message)
    }
}



//New password set action 
export const NewPasswordAction = (password, auth, navigate, Cookies) => async (dispatch) => {
  try {
    dispatch({type:LOADER_START})
     await axios({
        method: 'POST',
        url: '/api/v1/users/set-new-password',
        headers:{
          'Content-Type': 'application/json' 
        },
        data: {
           password: password,
           auth: auth
        }
     }).then ( res => {
        if(res.status === 200) {
          dispatch({type:LOADER_END})
          CreateAlert('success', res.data.message);
          localStorage.setItem('facebookUserisLogin', true)
          navigate('/')
          dispatch({
            type: USER_LOGIN,
            payload:res.data.loginUser
          })
          Cookies.remove('reset-password')
          Cookies.remove('findUser')
          window.location.reload()
        } 
     })
  } catch (error) {
     dispatch({type:LOADER_END})
     CreateAlert('error', error.response.data.message)
  }
}