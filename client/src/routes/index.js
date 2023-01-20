import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"

import { privateRoute } from "./privateRoute"
import { publicRoute } from "./publicRoute"


const ProtectedRoute = ({children}) => {
   if (Cookies.get('ffbtoken')) {
      return children
   } else {
      return <Navigate to={'/login'}/>
   }
}

const ProtectedPublicRoute = ({children}) => {
   if (Cookies.get('ffbtoken')) {
      return <Navigate to={'/'}/>
   } else {
      return children
   }
}


export const getPrivateRoute = () => {
    const filterRoute = []

   privateRoute.forEach(route => {
      route.element = <ProtectedRoute>{route.element}</ProtectedRoute>
      filterRoute.push(route)
   })

   return filterRoute
    // if have layout 
    //  return {
    //     path:'/',
    //     element: <Outlet/>,
    //     children:filterRoute
    //   }
}


export const getPublicRoute = () => {
    const filterRoute = []

   publicRoute.forEach(route => {
      route.element = <ProtectedPublicRoute>{route.element}</ProtectedPublicRoute>
      filterRoute.push(route)
   })

   return filterRoute
}