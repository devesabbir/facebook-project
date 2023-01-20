import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const TokenVerify = () => {
   let params =  useParams()
   
   useEffect(() => {

       const tokenVerifyRequest = async () => {
           try {
              await axios({
                 method: 'GET',
                 url:'/api/v1/users/activation',
                 params: {token:params}
              })
           } catch (error) {
            
           } 
       }

       tokenVerifyRequest()
   },[params])

  return (
    <div>TokenVerify</div>
  )
}

export default TokenVerify