import nodemailer from 'nodemailer'
import { RandomDigit } from './RandomDigit.js';
import dotenv from 'dotenv'
dotenv.config()


export const SendMail = async (to,data) => {
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });

        // send mail with defined transport object
      await transporter.sendMail({
            from: 'Facebook Pro <drivemovie721@gmail.com>', // sender address
            to: to,// list of receivers
            subject: data?.subject, // Subject line
            text: "Confirmation Alert.", // plain text body
            html: `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Template One</title>
            
            
            
            </head>
            <body>
                <table align="center" style=" 
                display: block;
                max-width: 720px;
                background-color: #FAF7FF;
            
                padding: 30px;
                border-radius: 5px;
                box-shadow: 0px 0px 27px 11px rgba(2,6,10,0.21);
            -webkit-box-shadow: 0px 0px 27px 11px rgba(2,6,10,0.21);
            -moz-box-shadow: 0px 0px 27px 11px rgba(2,6,10,0.21);
             ">
                    <tr style=" 
                      display: block;
                      border-bottom-width: 1px;
                      border-bottom-style: solid;
                      border-bottom-color: #ddd;
                      ">
                        <td>
                            <div ">
                     
                                      <img  src="
                                https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/150px-Facebook_f_logo_%282021%29.svg.png"
                                alt="" style="
                                          width: 40px;
                                          height: 40px;
                                          object-fit: cover;
                                          display: inline-block;
                                      ">
            
                            </div>
                        </td>
                        <td>
                            <span style="
                            color:#2579f2;
                            display: inline-block;
                            font-size:18px;
                            font-weight: 600;
                            margin-left: 10px;
                           ">Action Required:Confirm your Facebook account.</span>
                        </td>
                    </tr>
                    <tr style=" 
                          display: block;
                          padding: 5px;
                      ">
                        <td colspan="2">
                            <span style=" 
                                  color:#000;
                                  font-weight: 600;
                              ">Hey, ${data?.userName} </span>
                        </td>
                    </tr>
                    <tr style=" 
                      display: block;
                      padding: 5px;
                  ">
                        <td colspan="2">
                            <span style=" 
                                  color:#000;
                                  font-weight: 600;
                              ">You recently registered for facebook. To complete your registration, please confirm your
                                account.</span>
                        </td>
                    </tr>
            
                    <tr style=" 
                      display: block;
                      padding: 5px;
                  ">
                        <td colspan="2">
                            <a href="${data?.link}" style=" 
                                  background-color: #2579f2;
                                  color:#fff;
                                  font-weight: 600;
                                  text-decoration: none;
                                  border: none;
                                  display: block;
                                  padding: 10px;
                                  border-radius: 5px;
                              ">Confirm Your Account</a>
                        </td>
                    </tr>
                    <tr style=" 
                    display: block;
                    padding: 5px;
                ">
                        <td colspan="2">
                            <span style=" 
                                color:#000;
                                font-weight: 600;
                            ">You may be asked to enter this confirmation code.</span>
                        </td>
                    </tr>
                    <tr>
                        <td style=" 
                           display: inline-block;
                           width: 60%;
                         ">
            
                        </td>
                        <td style=" 
                         display: inline-block;
                         width: 30%;
                       ">
                            <span style="
                                 display: inline-block;
                                 background-color: #ddd;
                                 padding-top: 10px;
                                 padding-left: 15px;
                                 padding-right: 15px;
                                 padding-bottom: 10px;
                                 border-width: 1px;
                                 border-style: solid;
                                 border-color: #000;
                            ">
                               ${data?.code}
                            </span>
                        </td>
                    </tr>
                    <tr style=" 
                       display: block;
                      border-bottom-width: 1px;
                      border-bottom-style: solid;
                      border-bottom-color: #ddd;
                      padding: 10px;
                    ">
                        <td colspan="2">
                            <span style=" 
                                display: inline-block;
                                color: #000;
                            ">Facebook Pro helps you communicate and stay in touch with all of your friends. once you're joined
                                Facebook Pro. You will be able to share photoes, plan events and more.</span>
                        </td>
                    </tr>
                    
                    <tr style=" 
                       display: block;
                    ">
                        <td colspan="2">
                            <span style=" 
                                display: inline-block;
                                color: #000;
                            ">This message was sent to <a style=" 
                               display:inline-block;
                               text-decoration: none;
                               color: #2579f2;
            
                            " href="mailto:devssabbir@gmail.com">devssabbir@gmail.com</a>  at your request</span>
                        </td>
                    </tr>
                </table>
            </body>
            
            </html>
            
            `, // html body
        });
      
}


    