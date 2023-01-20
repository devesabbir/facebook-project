import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import PostBody from '../../components/PostBody/PostBody'
import style from './Home.module.scss'

const HomePage = () => {
    
  return (
    <>
        <Header/>
        <PostBody/>
        
    </>
  )
}

export default HomePage