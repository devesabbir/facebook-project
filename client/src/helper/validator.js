/**
 * check if email is valid
 * @param string emailAddress
 * @return boolean
 */
 export const isEmail = (email) => {
    let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.toLowerCase().match(regex)) 
     return true; 
    else 
     return false; 
 }
 