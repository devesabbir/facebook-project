import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LoadingBar from 'react-top-loading-bar'


import './App.css';
import './_assets/facebook-design-main/assets/css/style.css'

import { getPrivateRoute, getPublicRoute } from './routes';
import Router from './routes/Router';
import { KeepLoggedIn } from './redux/userAuth/actions';
import { LOADER_END } from './redux/loader/actionTypes';
import { notFound } from './routes/publicRoute';


 

function App() {
  const [allRoutes, setAllRoutes] = useState([...notFound])
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader)

  

  useEffect(() => {
     let token = Cookies.get('ffbtoken') ? Cookies.get('ffbtoken') : null
     dispatch(KeepLoggedIn(Cookies,token))
   
  },[dispatch])


  // Get Routes
  useEffect(() => {
     const privateRoute = getPrivateRoute()
     const publicRoute = getPublicRoute()
     setAllRoutes((prev) => ([...prev, ...publicRoute, ...privateRoute])) 
  },[])

  return (
     <>
      {
      loader.isLoading && <LoadingBar
      color='#108ff2'
      height={3}
      progress={loader.progress}
      onLoaderFinished={() => dispatch({type:LOADER_END})}
    /> } 
       
      <Router allRoutes={allRoutes} />
   
     </>
    
  );
}

export default App;
