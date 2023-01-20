import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

/**
 * Create JWT Token
 * @param {*} payload 
 * @param {*} expiresIn 
 * @returns 
 */
export const CreateToken = (payload, expiresIn = '1d') => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresIn
  })
}


/**
 * Verify JWT Token
 * @param {*} token 
 * @returns boolean
 */
export const VerifyToken = (token) => {
  // verify token
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded
}

