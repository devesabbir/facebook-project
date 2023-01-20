import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";


export const privateRoute = [
     {
        path:'/',
        element:<HomePage/>
     },  
     {
        path:'/profile',
        element:<ProfilePage/>
     },
     {
        path:'/friends',
        element:'Friends'
     },
]