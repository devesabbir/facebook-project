import CreateError from "../utility/CreateError.js"
import {
    PasswordDecode
} from "../utility/PasswordHandle.js";
import {
    CreateToken
} from "../utility/Token.js";
import {
    isEmail,
    isPhone
} from "../utility/Validator.js"
import UserModel from './../models/UserModel.js';


/**
 * Get All Users
 * @access private 
 * @route api/v1/login
 * @method post
 */

export const LoginController = async (req, res, next) => {

    const {
        email,
        password
    } = req.body

    try {

        if (!email || !password) {
            next(CreateError(400, 'All Field are Required.'))
        }

        if (email && password) {

            if (!isEmail(email) && !isPhone(email)) {
                next(CreateError(400, 'Invalid Email or Phone.'))
            }

            if (isEmail(email) || isPhone(email)) {

                if (isEmail(email)) {
                    let user = await UserModel.findOne({
                        email: email
                    })
                    if (!user) {
                        next(CreateError(400, 'Invalid Email Address'))
                    }
                    if (user) {
                        let decodePass = PasswordDecode(password, user.password)
                        if (!decodePass) {
                            next(CreateError(400, 'Invalid password.'))
                        }

                        if (decodePass) {
                             
                            if(user.isVerify === false) {
                              next(CreateError(307, 'Please Verify your user acoount.'))
                            }
                               
                            if(user.isVerify === true) {
                                
                                let token = CreateToken({
                                    id: user._id
                                })
                                res.status(200).cookie('ffbtoken', token).json({
                                    message: 'Log in successfully.',
                                    loginUser: user,
                                    token: token
                                })
                            }
                         
                        }
                    }
                }

                if (isPhone(email)) {

                    if (email.length > 11) {
                        let phone = email.substring(3, 14)
                        let user = await UserModel.findOne({
                            phone: {
                                $eq: phone
                            }
                        })

                        if (!user) {
                            next(CreateError(400, 'Invalid mobile number.'))
                        }

                        if (user) {

                            let decodePass = PasswordDecode(password, user.password)
                            if (!decodePass) {
                                next(CreateError(400, 'Invalid password.'))
                            }

                            if (decodePass) {
                                if(user.isVerify === false) {
                                    next(CreateError(307, 'Please Verify your user acoount.'))
                                  }
                                     
                                  if(user.isVerify === true) {
                                      
                                      let token = CreateToken({
                                          id: user._id
                                      })
                                      res.status(200).cookie('ffbtoken', token).json({
                                          message: 'Log in successfully.',
                                          loginUser: user,
                                          token: token
                                      })
                                  }
                               
                            }
                        }
                    }

                    if (email.length <= 11) {
                        let phone = email
                        let user = await UserModel.findOne({
                            phone: {
                                $eq: phone
                            }
                        })

                        if (!user) {
                            next(CreateError(400, 'Invalid mobile number.'))
                        }

                        if (user) {

                            let decodePass = PasswordDecode(password, user.password)
                            if (!decodePass) {
                                next(CreateError(400, 'Invalid password.'))
                            }

                            if (decodePass) {
                                if(user.isVerify === false) {
                                    next(CreateError(307, 'Please Verify your user acoount.'))
                                  }
                                     
                                  if(user.isVerify === true) {
                                      
                                      let token = CreateToken({
                                          id: user._id
                                      })
                                      res.status(200).cookie('ffbtoken', token).json({
                                          message: 'Log in successfully.',
                                          loginUser: user,
                                          token: token
                                      })
                                  }
                               
                            }

                        }
                    }

                }

            }
        }

    } catch (error) {
        next(error)
    }
}