import dotenv from 'dotenv'
dotenv.config({
    path: '../.env'
})
import axios from 'axios'


/**
 *  
 * @param {cell number} cell 
 * @param {message} msg 
 */
export const SendSms = async (cell, msg) => {

    try {
         await axios.post(`https://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API_KEY}&type=text&number=${cell}&senderid=${process.env.SMS_SENDER_ID}&message=${msg}`).then(res => console.log(res))

    } catch (error) {
        console.log(error);
    }
}