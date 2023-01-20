import React from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useState } from 'react'


import Header from '../../components/Header/Header'
import PostBody from '../../components/PostBody/PostBody'
import Auth from '../Auth/Auth'
import style from './Home.module.scss'




const HomePage = () => {
  const isLogin = useSelector( state => state.user.login)
  
  return (
     <>
        {
          isLogin ? <>
             <Header/>
             <PostBody/>
          
          </> : <Auth/>
        }
     </>
  )
  }

export default HomePage