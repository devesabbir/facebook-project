import React from "react";


// Internal Import 
import logo from '../../_assets/icons/facebook.svg'

const OptionalHeader = () => {
     
    return (
        <>
     <div className="reset-header">
      <div className="reset-header-wraper">
      <div className="reset-logo">
        <img src={logo} alt="" />
      </div>
      <div className="login-part">
        <input type="text" placeholder="Email or mobile number" />
        <input type="text" placeholder="Password" />
        <button>Log In</button>
        <a href="#">Forgotten account?</a>
      </div>
    </div>
    </div>
        </>
    )
}

export default OptionalHeader