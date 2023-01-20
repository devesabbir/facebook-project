
import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';


// Internal Import 
import { CreateAlert } from '../../helper/alertMsg';
import { useNavigate } from 'react-router-dom';
import OptionalHeader from '../../components/Header/OptionalHeader';
import Footer from '../../components/Footer/Footer';



const Verification = () => {

  const useremail = Cookies.get('facebook_access_token') && Cookies.get('facebook_access_token') 
  
  let otp = useRef()
  const navigate = useNavigate()


  // Submit Otp request
  const submitOtp = async (e) => {
    e.preventDefault()

    if (!otp.value) {
      CreateAlert('warn', 'OTP code is required!')
    } 
    else {
      
      let payload = {otp:otp.value, email:useremail}

      try {
       await axios({
       method: 'POST',
       url: '/api/v1/users/activation/otp-code',
       headers: {
         'Content-Type': 'application/json'
       },
       data: payload
    }).then( res => {
        if ( res.status === 200) {
           CreateAlert('success', 'Your account is verified and activated.')
           Cookies.remove('facebook_access_token')
           navigate('/login')
        }
     })
   } catch (error) {
    CreateAlert('error', error.response.data.message);
     }
       
    }
     
  }


  // Resend Otp Request
  const resendOtpRequest = async (e) => {
     e.preventDefault()

     let payload = {
        email: useremail
     }

     try {     
      await axios({
        method: 'POST',
        url: '/api/v1/users/activation/otp-code/resend',
        headers: {
          'Content-Type': 'application/json'
        },
        data:payload
      }).then( res => {
        if ( res.status === 200) {
           CreateAlert('success', res.data.message)
         }

      })
      
     } catch (error) {
       CreateAlert('error', error.response.data.message);
     }

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
                <span>{useremail}</span>
              </div>
            </div>
          </div>
          <div className="reset-footer">
            <a onClick={resendOtpRequest} href="#">Didn't get a code?</a>
            <div className="reset-btns">
              <a className="cancel" href="#">Cancel</a>
              <a onClick={submitOtp} className="continue" href="#">Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Verification