import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'


import Footer from '../../components/Footer/Footer'
import OptionalHeader from '../../components/Header/OptionalHeader'
import { useDispatch } from 'react-redux'
import { NewPasswordAction } from '../../redux/userAuth/actions'

const ResetPassword = () => {
   let password = useRef()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const auth = Cookies.get('reset-password') ? JSON.parse(Cookies.get('reset-password')): null

 
   // passResetHandle
   const passResetHandle = (e) => {
      e.preventDefault()
      dispatch(NewPasswordAction(password.value,auth,navigate,Cookies))
   }


  return (
    <> 
    <OptionalHeader/>
    <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Choose a new password</span>
          </div>
          <div className="reset-body">
            <p>
              Create a new password that is at least 6 characters long. A strong
              password has a combination of letters, digits and punctuation
              marks.
            </p>
            <div className="code-box">
              <input ref={input => password = input} className="w-100" type="text" placeholder="New password" />
            </div>
          </div>
          <div className="reset-footer">
            <a href="#"></a>
            <div className="reset-btns">
              <Link className="cancel" to={'/find-user-otp'}>Skip</Link>
              <a onClick={passResetHandle} className="continue" href="#">Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <Footer/>
    </>
  )
}

export default ResetPassword