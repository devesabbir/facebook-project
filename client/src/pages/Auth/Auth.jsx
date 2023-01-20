import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';



import facebookLogo from '../../_assets/icons/facebook.svg'
import Footer from '../../components/Footer/Footer'
import Registration from '../../components/Register/Registration'
import { UserLogin } from '../../redux/userAuth/actions';


const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registerModal, setRegisterModal] = useState(false)

  const [input, setInput] = useState({
    email:'',
    password:''
  })

  //  Handle Input 
  const handleInput = (e) => {
     let target = e.target
     let name = target.name
     let value = target.value
     setInput((prevState) => ({
        ...prevState,
        [name]: value
     }))
  }
 
  //  Handle Login
  const handleiLogin = (e) => {
     e.preventDefault()
     dispatch(UserLogin(input,navigate,e))
  }
  

  return (
    <>
    <div className="fb-auth">
      <div className="auth-wraper">
        <div className="auth-left">
          <img src={facebookLogo} alt="" />
          <h2>
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>
        <div className="auth-right">
          <div className="auth-box">
            <form onSubmit={handleiLogin} >
              <div className="auth-form">
                <input
                  onChange={handleInput}
                  name={'email'}
                  value={input.email}
                  type="text"
                  placeholder="Email address or phone number"
                />
              </div>
              <div className="auth-form">
                <input 
                onChange={handleInput}
                name={'password'}
                value={input.password}
                type="password" 
                placeholder="Password" />
              </div>
              <div className="auth-form">
                <button type="submit">Log In</button>
              </div>
            </form>

            <Link to={'/forgot-user-password'}>Forgotten password?</Link>

            <div className="divider"></div>

            <button onClick={() => setRegisterModal(true)}>Create New Account</button>
          </div>
          <p>
            <a href="#">Create a Page</a> for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
    <Footer/>

     {
       registerModal && <Registration setRegisterModal={setRegisterModal} />
     } 
    </>
  )
}

export default Auth