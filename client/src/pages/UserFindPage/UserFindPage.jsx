import React from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import cookie from 'js-cookie'
import axios from 'axios'


import Footer from '../../components/Footer/Footer'
import OptionalHeader from '../../components/Header/OptionalHeader'
import { CreateAlert } from '../../helper/alertMsg'


const UserFindPage = () => {
  const user = (JSON.parse(cookie?.get('findUser')))
  let auth =  user.phone || user.email
  const navigate = useNavigate()

  // Handle Not You Reset Cookie 
  const handleResetCookie = () => {
    if(cookie.get('findUser')) {
      cookie.remove('findUser')
    }
  }

  // handleOtpRequest
   const handleOtpRequest = async (e) => {
      e.preventDefault()
      try {
        await axios({
            method: 'POST',
            url:'/api/v1/users/forgot-user-password-otp',
            data: { auth: auth}
        }).then ( res => {
           if(res.status === 200) {
             navigate('/find-user-otp')
             CreateAlert('success', res.data.message)
           }
        })
        
      } catch (error) {
         CreateAlert('error', 'Something went wrong!')
      }
   }


  return (
    <>
    <OptionalHeader/>
    <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Reset your password</span>
          </div>
          <div className="reset-body">
            <div className="find-user-account">
              <img src={user?.profile_photo} alt="photo" />
              <span>{user?.first_name + ' ' + user?.sur_name}</span>
              <p>To reset your account password, please continue</p>
            </div>
          </div>
          <div className="reset-footer">
            <a href="#"></a>
            <div className="reset-btns">
              <Link onClick={handleResetCookie} className="cancel" to={'/forgot-user-password'}>Not you ?</Link>
              <a onClick={handleOtpRequest} className="continue" href='#'>Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default UserFindPage