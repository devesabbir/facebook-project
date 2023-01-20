import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {CreateAlert}  from '../../helper/alertMsg'
import { dateArray, monthArray, yearArray } from '../../helper/dateHelper'
import closeIcon from '../../_assets/icons/cross.png'
import { UserRegistration } from '../../redux/userAuth/actions'


const Registration = ({setRegisterModal}) => {
  
  const navigate =  useNavigate()
  const dispatch =  useDispatch()
 

  // Validate form
  const [validate, setValidate] = useState({
    first_name: false,
    sur_name: false,
    email: false,
    password: false
    // gender: false
  })

  // Input Form Value
  const [input, setInput] = useState({
    first_name: '',
    sur_name: '',
    email: '',
    password: '',
    birth_date: '',
    birth_month: '',
    birth_year: '',
    gender: ''
  })

  //  HandleFormInput 
  const handleInput = (e) => {
     let target = e.target
     
     setInput((prev) => ({
      ...prev,
      [target.name] : target.value
    }))
    
  }

  //  handle Validate 
  const handleValidate = (e) => {
     let fieldName = e.target.name
     if(!input[fieldName]){
        setValidate((prev) => ({
           ...prev,
           [fieldName]: true
        }))
     } else {
       setValidate((prev) => ({
          ...prev,
          [fieldName]: false
       }))
     }
  }


  // handle Focus 
  const handleFocus = (e) => {
     let fieldName = e.target.name
     setValidate( (prev) => ({
        ...prev,
        [fieldName] : false
     }))
  }


  // Required Border Style
  const borderStyle = {
      borderWidth:'1px',
      borderColor:'red',
      borderStyle:'solid'
  }

  // handleFormSubmit 
  const handleFormSubmit = (e) => {
      e.preventDefault()

      let formData = new FormData()

       if 
       (
        !input.first_name || 
        !input.sur_name ||
        !input.email  ||
        !input.password ||
        !input.birth_date ||
        !input.birth_month ||
        !input.birth_year || 
        !input.gender 

        ) 
        {    
          CreateAlert('error','All Field Required!')
        } 
        else 
        {
          
         formData.append('first_name', input.first_name)
         formData.append('sur_name', input.sur_name)
         formData.append('email', input.email)
         formData.append('password', input.password)
         formData.append('birth_date', input.birth_date)
         formData.append('birth_month', input.birth_month)
         formData.append('birth_year', input.birth_year)
         formData.append('gender', input.gender)

         dispatch(UserRegistration(formData, navigate, e)) 

        }

  }
  

return (
  <> 
   <div className="blur-box">
    <div className="sign-up-card">
      <div className="sign-up-header">
        <div className="sign-up-content">
          <span>Sign Up</span>
          <span>It's quick and easy.</span>
        </div>
        <button onClick={() => setRegisterModal(false)}><img src={closeIcon} alt="" /></button>
      </div>
      <div className="sign-up-body">
        <form onSubmit={handleFormSubmit}>
          <div className="reg-form reg-form-inline" style={{position:'relative'}}>
            <input 
            onChange={handleInput}
            onBlur = {handleValidate}
            onFocus = {handleFocus}
            name='first_name' 
            type="text"  
            placeholder="First Name"
            style={validate.first_name ? {...borderStyle} : {}}
            />

             {
              validate.first_name ? <span style={{color:'red', display:'block',position:'absolute', top:'-20px', left:0}}>Required!</span> : ''
             }
          
            <input 
             onChange={handleInput}
             onBlur = {handleValidate}
             onFocus = {handleFocus}
             name='sur_name' 
             type="text" 
             placeholder="Surname"
             style={validate.sur_name ? {...borderStyle} : {}}
              />
              
             {
              validate.sur_name ? <span style={{color:'red', display:'block',position:'absolute', top:'-20px', right:0}}>Required!</span> : ''
             } 
            
          </div>
            
          <div className="reg-form">
            <input 
             onChange={handleInput}
             onBlur = {handleValidate}
             onFocus = {handleFocus}
             name='email' 
             type="text" 
             placeholder="Mobile number or email address" 
             style={validate.email ? {...borderStyle} : {}}
             />

            {
              validate.email ? <span style={{color:'red', display:'block'}}>Required!</span> : ''
            } 
            
          </div>
          <div className="reg-form">
            <input 
            onChange={handleInput} 
            onBlur = {handleValidate}
            onFocus = {handleFocus}
            name='password'
            type="text" 
            placeholder="New password" 
            style={validate.password ? {...borderStyle} : {}}
            />

            { 
              validate.password ? <span style={{color:'red', display:'block'}}>Required!</span> : ''
            }  
          </div>
          <div className="reg-form">
            <span>Date of birth</span>
            <div className="reg-form-select">
              <select 
              onChange={handleInput} 
              name="birth_date" 
              id=""
              >
                  <option value="">Day</option>
                  {
                    dateArray?.map( (item,i) => (
                      <option key={i} value={item} >{item}</option>
                    ))
                  }
              </select>
              <select 
              onChange={handleInput} 
              name="birth_month" 
              id=""
              >
                <option value="">Month</option>
                {
                  monthArray?.map((item,i) => (
                    <option key={i} value={item} >{item}</option>
                  ))
                }
              </select>
              <select 
              onChange={handleInput} 
              name="birth_year" 
              id=""
              >
                <option value="">Year</option>
                {
                  yearArray?.map( (item,i) => (
                    <option key={i} value={item}>{item}</option>
                  ))
                }
              </select> 
            </div>
          </div>

          <div className="reg-form">
            <span>Gender</span>
            <div className="reg-form-select">
              <label>
                Female
                <input 
                onChange={handleInput} 
                type="radio" 
                value={'female'} 
                name="gender" />
              </label>
              <label>
                Male
                <input
                 onChange={handleInput} 
                 type="radio"
                  value={'male'} 
                  name="gender" 
                  />
              </label>
              <label>
                Custom
                <input 
                onChange={handleInput} 
                type="radio" 
                value={'custom'} 
                name="gender" 
                />
              </label>
            </div>
          </div>

          <div className="reg-form">
            <p>
              People who use our service may have uploaded your contact
              information to Facebook. <a href="#">Learn more.</a>
            </p>
          </div>
          <div className="reg-form">
            <p>
              By clicking Sign Up, you agree to our <a href="#">Terms</a>,
              <a href="#">Privacy Policy</a> and
              <a href="#">Cookies Policy</a>. You may receive SMS
              notifications from us and can opt out at any time.
            </p>
          </div>

          <div className="reg-form">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  </>
 
  )
}

export default Registration