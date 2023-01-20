import cookie from 'cookie-parser';
import CreateError from './../utility/CreateError.js';
import UserModel from './../models/UserModel.js';
import {
    isEmail,
    isPhone
} from '../utility/Validator.js';
import {
    PasswordEncode
} from '../utility/PasswordHandle.js';
import {
    SendMail
} from './../utility/SendMail.js';
import {
    CreateToken,
    VerifyToken
} from '../utility/Token.js';
import {
    RandomDigit
} from '../utility/RandomDigit.js';
import {
    SendSms
} from '../utility/SendSms.js';
import {
    SendMailOtp
} from '../utility/SendMailOtp.js';


/**
 * User Registration 
 * @access public
 * @route  api/v1/users/register
 * @method post
 */

export const UserRegistration = async (req, res, next) => {
    const {
        first_name,
        sur_name,
        email,
        password,
        birth_date,
        birth_month,
        birth_year
    } = req.body;

    try {


        if (!first_name || !email || !password) {
            next(CreateError(400, 'Some Field are required!'))
        } else {

            //  Registration with email
            if (isEmail(email)) {

                let existUser = await UserModel.findOne({
                    email: email
                })

                if (existUser) {

                    if (existUser.isVerify === true) {
                        next(CreateError(400, 'User Already Registered!'))
                    }
                    if (existUser.isVerify === false) {
                        next(CreateError(401, 'Please Verify your account.'))
                    }

                }

                if (!existUser) {


                    let activationCode = RandomDigit(6)

                    const newUser = await UserModel.create({
                        ...req.body,
                        email: email,
                        phone: null,
                        password: PasswordEncode(password),
                        access_token: activationCode
                    })

                    let activationToken = CreateToken({
                        email: email
                    }, '15m')

                    let msg = {
                        subject: 'Verify Your Account',
                        userName: newUser.first_name,
                        link: process.env.APP_URL + '/activation/' + activationToken,
                        code: activationCode
                    }

                    SendMail(newUser.email, msg)

                    res.status(200).cookie('facebook_access_token', email).json({
                        message: 'New User Registered!',
                        user: newUser,
                        token: activationToken
                    })

                }

            }

            //  Registration with phone number
            if (isPhone(email)) {

                if (email.length > 11) {
                    let phone = email.substring(3, 14)
                    let existUser = await UserModel.findOne({
                        phone: {
                            $eq: phone
                        }
                    })

                    if (existUser) {
                        if (existUser.isVerify === true) {
                            next(CreateError(400, 'User Already Registered!'))
                        }
                        if (existUser.isVerify === false) {
                            next(CreateError(401, 'Please Verify your account.'))
                        }
                    }

                    if (!existUser) {

                        let activationCode = RandomDigit(6)

                        const newUser = await UserModel.create({
                            ...req.body,
                            email: null,
                            phone: phone,
                            password: PasswordEncode(password),
                            access_token: activationCode
                        })

                        let msg = `হ্যালো, ${newUser.first_name} ওটিপি কোডের মাধ্যমে আপনার একাউন্ট ভেরিফাই করুন ওটিপিঃ ${activationCode}`

                        SendSms(phone, msg)

                        res.status(200).cookie('facebook_access_token', phone).json({
                            message: 'New User Registered!',
                            user: newUser,
                        })

                    }
                }

                if (email.length <= 11) {
                    let phone = email
                    let existUser = await UserModel.findOne({
                        phone: {
                            $eq: phone
                        }
                    })

                    if (existUser) {
                        if (existUser.isVerify === true) {
                            next(CreateError(400, 'User Already Registered!'))
                        }
                        if (existUser.isVerify === false) {
                            next(CreateError(401, 'Please Verify your account.'))
                        }
                    }

                    if (!existUser) {

                        let activationCode = RandomDigit(6)

                        const newUser = await UserModel.create({
                            ...req.body,
                            email: null,
                            phone: phone,
                            password: PasswordEncode(password),
                            access_token: activationCode
                        })

                        let msg = `Hi, ${newUser.first_name} Verify Your Account with OTP ${activationCode}`

                        SendSms(phone, msg)

                        res.status(200).cookie('facebook_access_token', phone).json({
                            message: 'New User Registered!',
                            user: newUser,
                        })

                    }
                }

            }

        }
    } catch (error) {
        next(error)
    }
}


/**
 * Get All Users
 * @access private 
 * @route api/v1/users
 * @method get
 */
export const GetAllUsers = async (req, res, next) => {

    try {
        const users = await UserModel.find()
        res.status(200).json({
            message: 'All Users',
            data: users
        })

    } catch (error) {
        next(error)
    }

}


/**
 * Activate Account With JWT
 * @access public
 * @route api/v1/users/activation/:token
 * @method get
 */
export const ActivateAccount = async (req, res, next) => {

    const {
        token
    } = req.params
    try {

        if (VerifyToken(token)) {

            let verifiedUser = VerifyToken(token)

            let findUser = await UserModel.find({
                $and: [{
                    email: {
                        $eq: verifiedUser.email
                    }
                }, {
                    isVerify: {
                        $eq: false
                    }
                }]
            })

            if (!findUser.length > 0) {
                next(CreateError(400, 'User Already Verified!'))
            }

            if (findUser.length > 0) {

                let updateUser = await UserModel.findOneAndUpdate({
                    email: verifiedUser.email
                }, {
                    isVerify: true,
                    access_token: '',
                }, {
                    upsert: true
                })

                res.status(200).json({
                    message: 'Verified!',
                    user: updateUser
                })
            }

        }

    } catch (error) {
        next(error)
    }
}


/**
 * Activate Account with OTP
 * @access public
 * @route api/v1/users/activation/:token
 * @method post
 */
export const ActivateAccountOtp = async (req, res, next) => {

    const {
        otp,
        email
    } = req.body

    try {
        const findUser = await UserModel.findOne({
            $or: [{
                email: email
            }, {
                phone: email
            }]
        })

        if (!findUser) {
            next(CreateError(400, 'Activation User not found'))
        }

        if (findUser) {

            if (findUser.isVerify === true) {
                next(CreateError(400, 'User Already Verified!'))
            }

            if (findUser.isVerify === false) {

                if (findUser.access_token !== otp) {
                    next(CreateError(400, 'Invalid OTP code!'))
                }

                if (findUser.access_token === otp) {
                    const verifiedUser = await UserModel.findOneAndUpdate({
                        email: findUser.email
                    }, {
                        isVerify: true,
                        access_token: ''
                    }, {
                        upsert: true
                    })

                    res.status(200).json({
                        message: 'Verified Successfully!',
                        data: verifiedUser
                    })
                }
            }
        }

    } catch (error) {
        next(error)
    }
}



/**
 * Activate Account with OTP
 * @access public
 * @route api/v1/users/activation/:token
 * @method post
 */
export const ActivateAccountOtpResend = async (req, res, next) => {

    const {
        email
    } = req.body

    try {
        const user = await UserModel.find({
            $or: [{
                    email: {
                        $eq: email
                    }
                },
                {
                    phone: {
                        $eq: email
                    }
                }
            ]
        })

        if (!user.length > 0) {
            next(CreateError(400, 'User not found!'))
        }

        if (user.length > 0) {

            if (user[0].isVerify === true) {
                next(CreateError(400, 'User already verified.'))
            }

            if (user[0].isVerify === false) {

                //   if email user
                if (user[0].email) {

                    let activationCode = RandomDigit(6)

                    let activationToken = CreateToken({
                        email: email
                    }, '15m')

                    let user = await UserModel.findOneAndUpdate({
                        email: {
                            $eq: email
                        }
                    }, {
                        $set: {
                            access_token: activationCode
                        }
                    }, {
                        upsert: true
                    })

                    let msg = {
                        subject: 'Your OTP code is here.',
                        userName: user.first_name,
                        link: process.env.APP_URL + '/activation/' + activationToken,
                        code: activationCode
                    }

                    SendMail(email, msg)


                    res.status(200).json({
                        message: 'Verification link was sent successfully.',
                        data: user
                    })
                }


                // if phone user
                if (user[0].phone) {
                    let activationCode = RandomDigit(6)

                    let user = await UserModel.findOneAndUpdate({
                        phone: {
                            $eq: email
                        }
                    }, {
                        $set: {
                            access_token: activationCode
                        }
                    }, {
                        upsert: true
                    })

                    let msg = `হ্যালো, ${user.first_name} ওটিপি কোডের মাধ্যমে আপনার একাউন্ট ভেরিফাই করুন ওটিপিঃ ${activationCode}`

                    SendSms(user.phone, msg)

                    res.status(200).json({
                        message: 'Your OTP code was sent.',
                        data: user
                    })

                }

            }
        }


    } catch (error) {
        next(error)
    }
}


/**
 * Forgot password request
 * @access public
 * @route api/v1/users/forgot-user-password
 * @method post
 */

export const ForgotPassword = async (req, res, next) => {

    const {
        auth
    } = req.body

    try {

        if (isEmail(auth)) {
            let existUser = await UserModel.findOne({
                email: {
                    $eq: auth
                }
            })

            if (!existUser) {
                next(CreateError(404, "User not found!"));
            }

            if (existUser) {
                let {
                    _id,
                    password,
                    access_token,
                    ...findUser
                } = existUser._doc

                res.status(200).cookie('findUser', JSON.stringify(findUser), Date.now() + (1000 * 60 * 15)).json({
                    message: 'User Found.',
                    data: findUser
                })
            }

        }

        if (isPhone(auth)) {
            if (auth.length > 11) {
                let phone = auth.substring(3, 14)
                let existUser = await UserModel.findOne({
                    phone: {
                        $eq: phone
                    }
                })

                if (!existUser) {
                    next(CreateError(404, "User not found!"));
                }

                if (existUser) {
                    let {
                        _id,
                        password,
                        access_token,
                        ...findUser
                    } = existUser._doc

                    res.status(200).cookie('findUser', JSON.stringify(findUser), Date.now() + (1000 * 60 * 15)).json({
                        message: 'User Found.',
                        data: findUser
                    })
                }
            }

            if (auth.length <= 11) {
                let phone = auth
                let existUser = await UserModel.findOne({
                    phone: {
                        $eq: phone
                    }
                })

                if (!existUser) {
                    next(CreateError(404, "User not found!"));
                }

                if (existUser) {
                    let {
                        _id,
                        password,
                        access_token,
                        ...findUser
                    } = existUser._doc

                    res.status(200).cookie('findUser', JSON.stringify(findUser), Date.now() + (1000 * 60 * 15)).json({
                        message: 'User Found.',
                        data: findUser
                    })
                }
            }
        }

    } catch (error) {
        next(error)
    }
}



/**
 * Forgot password otp send
 * @access public
 * @route api/v1/users/forgot-user-password-otp
 * @method post
 */

export const ForgotPasswordOtp = async (req, res, next) => {

    const {
        auth
    } = req.body
    try {
        if (isEmail(auth)) {
            let otp = RandomDigit(6)
            let setOtp = await UserModel.findOneAndUpdate({
                email: auth
            }, {
                access_token: otp
            }, {
                upsert: true
            })


            if (!setOtp) {
                next(CreateError(404, 'User not found!'))
            }

            if (setOtp) {
                let msg = {
                    subject: 'Your OTP is here.',
                    userName: setOtp.first_name,
                    code: otp
                }
                SendMailOtp(auth, msg)
                res.status(200).json({
                    message: 'OTP code has been sent successfully.',
                    data: setOtp
                })
            }

        }

        if (isPhone(auth)) {

            if (auth.length > 11) {
                let phone = auth.substring(3, 14)
                let otp = RandomDigit(6)

                let setOtp = await UserModel.findOneAndUpdate({
                    phone: phone
                }, {
                    access_token: otp
                }, {
                    upsert: true
                })

                if (!setOtp) {
                   next(CreateError(404,'User Not Found!'));
                }

                if (setOtp) {
                    let msg = `হ্যালো, ${newUser.first_name} ওটিপি কোডের মাধ্যমে আপনার একাউন্টের পাসওয়ার্ড পরিবর্তন করুন, ওটিপিঃ ${otp}`
                    SendSms(phone, msg)
                    res.status(200).json({
                        message: 'OTP code has been sent successfully.',
                        data: setOtp
                    })

                }
            }
             if (auth.length <= 11) {
                let phone = auth
                let otp = RandomDigit(6)

                let setOtp = await UserModel.findOneAndUpdate({
                    phone: phone
                }, {
                    access_token: otp
                }, {
                    upsert: true
                })

                if (!setOtp) {
                   next(CreateError(404,'User Not Found!'));
                }
 
                if (setOtp) {
                    let msg = `হ্যালো, ${setOtp.first_name} ওটিপি কোডের মাধ্যমে আপনার একাউন্টের পাসওয়ার্ড পরিবর্তন করুন, ওটিপিঃ ${otp}`
                    SendSms(phone, msg)
                    res.status(200).json({
                        message: 'OTP code has been sent successfully.',
                        data: setOtp
                    })

                }
             }

        }

    } catch (error) {
        next(error)
    }
}
 
/**
 * Reset Password
 * @access public
 * @route api/v1/users/reset-user-password-requiest
 * @method post
 */
export const ResetPasswordRequest = async (req, res, next) => {
   const { otp, auth } = req.body
   try {
      if(isEmail(auth)) {
        let email = auth
        let findUser = await UserModel.findOne({email:{$eq:email}})
        if(findUser.access_token !== otp) {
           next(CreateError(400, 'Invalid OTP token!'))
        }

        if(findUser.access_token === otp){
            res.status(200).cookie('reset-password', JSON.stringify(auth) , Date.now() + (1000 * 60 * 15)).json({
                message:'Password Change Requiest accepted.',
            })
        }
      }

      if(isPhone(auth)){
        
         if (auth.length > 11) {
            let phone = auth.substring(3,14)
            let findUser = await UserModel.findOne({phone:{$eq:phone}})
            if(findUser.access_token !== otp) {
               next(CreateError(400, 'Invalid OTP token!'))
            }

            if(findUser.access_token === otp){
                res.status(200).cookie('reset-password', JSON.stringify(auth) , Date.now() + (1000 * 60 * 15)).json({
                    message:'Password Change Request accepted.',
                })
            }
         }

         if (auth.length <= 11) {
            let phone = auth
            let findUser = await UserModel.findOne({phone:{$eq:phone}})
            if(findUser.access_token !== otp) {
               next(CreateError(400, 'Invalid OTP token!'))
            }

            if(findUser.access_token === otp){
                res.status(200).cookie('reset-password', JSON.stringify(auth) , Date.now() + (1000 * 60 * 15)).json({
                    message:'Password Change Requiest accepted.',
                })
            }
         }
      }
   } catch (error) {
     next(error)
   }
}


/**
 * Reset Password
 * @access public
 * @route api/v1/users/set-new-password
 * @method post
 */

export const SetNewPassword = async (req, res, next) => {
    const {password, auth} = req.body
    try { 
       if(isEmail(auth)){
          let hashPassword = PasswordEncode(password)
          let user = await UserModel.findOneAndUpdate({email:{$eq:auth}},{password:hashPassword,
             isVerify:true, 
             access_token:''},{upsert:true})

          if(!user){
             next(CreateError(401, "User not found"))
          }

          if (user) {
            let token = CreateToken({
                id: user._id
            })
           res.status(200).cookie('ffbtoken', token).json(
               {message:'Password updated successfully',
              loginUser: user
           })
          }
       }

       if(isPhone(auth)){
          if (auth.length > 11) {
            let phone = auth.substring(3,14)
            let hashPassword = PasswordEncode(password)
            let user = await UserModel.findOneAndUpdate({phone:{$eq:phone}},{password:hashPassword,
                isVerify:true, 
                access_token:''
                },{upsert:true})

           if(!user){
             next(CreateError(401, "User not found"))
           }

            if (user) {
                let token = CreateToken({
                    id: user._id
                })
                res.status(200).cookie('ffbtoken', token).json(
                   {message:'Password updated successfully',
                  loginUser: user
                })
            }
          }
          
          if (auth.length <= 11) {
            let phone = auth
            let hashPassword = PasswordEncode(password)
            let user = await UserModel.findOneAndUpdate({phone:{$eq:phone}},{password:hashPassword,
                isVerify:true, 
                access_token
                :''},{upsert:true})

            if(!user){
              next(CreateError(401, "User not found"))
            }

            if (user) {
                let token = CreateToken({
                    id: user._id
                })
               res.status(200).cookie('ffbtoken', token).json(
                   {message:'Password updated successfully',
                  loginUser: user
               })
            }

          }

       }
        
    } catch (error) {
        next(error)
    } 
}


/**
 * Keep LoggedIn User
 * @access private 
 * @route api/v1/users/me 
 * @method get
 */
export const LoggedInUser = async (req, res, next) => {
    let token = req.headers?.authorization

    try {
        if (!token) {
            next(CreateError(401, 'You are not Authorized'))
        }

        if (token) {
            let verifyToken = VerifyToken(token.split(' ')[1])

            let loggedInUser = await UserModel.findOne({
                _id: verifyToken.id
            })

            if (!loggedInUser) {
                next(CreateError(401, 'You are not Authorized'))
            }

            if (loggedInUser) {
                res.status(200).cookie('ffbtoken', token.split(' ')[1]).json({
                    message: 'You are logged in',
                    loginUser: loggedInUser
                })
            }

        }

    } catch (error) {
        next(error)
    }
}