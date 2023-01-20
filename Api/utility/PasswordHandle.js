import bcrypt from "bcryptjs";

/**
 * EncryptPassword
 * @param {*} password 
 * @returns 
 */
export const PasswordEncode = (password) => {
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}


/**
 * Decode password
 * @param {*} password 
 * @param {*} hash 
 * @returns 
 */

export const PasswordDecode = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}



