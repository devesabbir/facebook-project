import React, { useRef } from 'react'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';




import Footer from '../../components/Footer/Footer'
import OptionalHeader from '../../components/Header/OptionalHeader'
import { ForgotPasswordAction } from '../../redux/userAuth/actions';




const ForgotPassOtp = () => {
   let otp = useRef()
   const dispatch = useDispatch()
   const  navigate = useNavigate()
   const user = JSON.parse(Cookies?.get('findUser'))
   let auth =  user.phone || user.email

  //handle Otp Request
  const handleOtpRequest = (e) => {
     e.preventDefault()
     dispatch(ForgotPasswordAction(otp.value, auth, navigate))
    
  }

  return (
    <>
     <OptionalHeader/>
    <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Enter security code</span>
          </div>
          <div className="reset-body">
            <p>
              Please check your emails for a message with your code. Your code
              is 6 numbers long.
            </p>
            <div className="code-box">
              <input ref={input => otp = input} type="text" />
              <div className="code-text">
                <span>We sent your code to:</span>
                <span>{auth}</span>
              </div>
            </div>
          </div>
          <div className="reset-footer">
            <a href="#">Didn't get a code?</a>
            <div className="reset-btns">
              <Link className="cancel" to={'/login'}>Cancel</Link>
              <a onClick={handleOtpRequest} className="continue" href="#">Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  )
}

export default ForgotPassOtp