import ProfilePage from "../pages/ProfilePage/ProfilePage";


export const privateRoute = [  
     {
        path:'/profile/:id',
        element:<ProfilePage/>
     },
     {
        path:'/friends',
        element:'Friends'
     },
]