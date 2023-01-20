import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios' 



import Footer from '../../components/Footer/Footer'
import OptionalHeader from '../../components/Header/OptionalHeader'
import { CreateAlert } from '../../helper/alertMsg'



const Forgot = () => {
   let email = useRef()
   const navigate = useNavigate()


  //  Handle User Find
   const handleFind = async () => {
      if(!email.value) {
         CreateAlert('warn', 'Please enter a valid email or phone number.')
         email.style.cssText = "border:1px solid red"
      }

      if(email.value) {
        email.style.cssText = "border:1px solid #ccc"
          
         try {
            await axios({
              method:'POST',
              url:'/api/v1/users/forgot-user-password',
              withCredentials:true,
              headers: {
                'Content-Type': 'application/json'
              },
              data:{auth:email.value}
           }).then( res => {
        
              if(res.status === 200){
                 let auth = res.data.data.phone || res.data.data.email
                 navigate('/find-user/'+ auth) 
              } 
           })
         } catch (error) {
            CreateAlert('error', error.response.data.message) 
         }
 
      }
    
   }

 
  return (
    <>
      <OptionalHeader/>
      <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Find Your Account</span>
          </div>
          <div className="reset-body">
            <p>
              Please enter your email address or mobile number to search for
              your account.
            </p>
            <div className="code-box">
              <input
                className="w-100"
                ref={input => email = input}
                type="text"
                placeholder="Email address or mobile number"
              />
            </div>
          </div>
          <div className="reset-footer">
            <div className="reset-btns">
              <Link className="cancel" to={'/login'}>Cancel</Link>
              <Link className="continue" onClick={handleFind} >Search</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Forgot