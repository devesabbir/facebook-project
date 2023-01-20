import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const NavigateRoute = () => {
  const isLogin  =  useSelector( state => state.user.isLogin) 
  return isLogin ? <Navigate to={'/'}/> : <Outlet/>
} 

export default NavigateRoute