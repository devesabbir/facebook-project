
import Auth from "../pages/Auth/Auth";
import Forgot from "../pages/Forgot/Forgot";
import ForgotPassOtp from "../pages/ForgotPasswordOtp/ForgotPassOtp";
import HomePage from "../pages/HomePage/HomePage";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import TokenVerify from "../pages/TokenVerify/TokenVerify";
import UserFindPage from "../pages/UserFindPage/UserFindPage";
import Verification from "../pages/Verification/Verification";




export const publicRoute = [
    {
      path:'/login',
      element:<Auth/>
    }, 
    {
      path:'/account-verification',
      element:<Verification/>
    },
    {
      path:'/find-user/:id',
      element:<UserFindPage/>
    }, 
    {
      path:'/find-user-otp',
      element:<ForgotPassOtp/>
    },
    {
      path:'/forgot-user-password',
      element:<Forgot/>
    },
    {
      path:'/reset-user-password',
      element:<ResetPassword/>
    },
    {
      path:'/users/activation/:token',
      element:<TokenVerify/>
    }
    
]

export const unProtectedRoutes = [
   {
    path:'/',
    element:<HomePage/>
   }
]

export const notFound = [
  {
      path:'*',
      element:'Not Found!'
  },
]