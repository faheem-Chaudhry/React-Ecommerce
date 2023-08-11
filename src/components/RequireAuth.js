import React, {useEffect, useState} from "react";
import { useNavigate, Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
     //const [isState, setIsState] = useState(false);
  const location = useLocation();
  const cartCtx = useAuth();
  let admin = JSON.parse(localStorage.getItem('admin'));

//   useEffect(()=>{
//      const admin = JSON.parse(localStorage.getItem('admin'));
//      console.log('useEffect',admin)
//      setIsState(admin)
//   },[])
  //console.log('isState',isState)
  return (
    admin?<Outlet /> : <Navigate to='/admin-login' state={{from: location}} replace/>
  )
};

export default RequireAuth;
