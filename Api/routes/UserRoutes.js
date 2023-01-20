import express from 'express';
import {
    LoginController
} from '../controllers/LoginController.js';
import {
    ActivateAccount,
    ActivateAccountOtp,
    ActivateAccountOtpResend,
    ForgotPassword,
    ForgotPasswordOtp,
    GetAllUsers,
    LoggedInUser,
    ResetPasswordRequest,
    SetNewPassword,
    UserRegistration
} from '../controllers/UserController.js';
const userRoute = express.Router();

userRoute.route('/me').get(LoggedInUser)
userRoute.route('/').get(GetAllUsers)
userRoute.route('/login').post(LoginController)
userRoute.route('/register').post(UserRegistration)
userRoute.route('/activation/:token').get(ActivateAccount)
userRoute.route('/activation/otp-code').post(ActivateAccountOtp)
userRoute.route('/activation/otp-code/resend').post(ActivateAccountOtpResend)
userRoute.route('/forgot-user-password').post(ForgotPassword)
userRoute.route('/forgot-user-password-otp').post(ForgotPasswordOtp)
userRoute.route('/reset-user-password-request').post(ResetPasswordRequest)
userRoute.route('/set-new-password').post(SetNewPassword)





export default userRoute;