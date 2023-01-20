/**
 * check if email is valid
 * @param string emailAddress
 * @return boolean
 */
 export const isEmail = (email) => {
   let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (email.toLowerCase().match(regex)) 
    return true; 
   else 
    return false; 
}

/**
 * check cell number
 * @param {string} cell 
 * @returns 
 */

export const isPhone = (cell) => {
   let regex = /(\+88)?(01[1-9])\d{8}/;
   if (regex.test(cell)) {
     return true;
   } else {
     return false;
   }   
}


