import {useEffect } from "react"
import { jwtDecode } from 'jwt-decode';
import { Outlet, useNavigate, Navigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuth } from "../hooks/useAuth"

const ProtectedRoutes = ({requiredRole}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const authStatus = isAuthenticated();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    
    if (!authStatus) {
      toast.warning("You have to be logged in");
      navigate("/signin");
      return;
    }
    // if (!token) {
    //   toast.warning("You have to be logged in");
    //   navigate("/signin");
    //   return;
    // }
    const payload = jwtDecode(token);
    // console.log(payload);
    if (payload.role !== requiredRole) {
      // console.log(payload);
      
      toast.warning("You are not allowed");
      navigate("/unauthorized")
    }
  }, [authStatus, navigate, requiredRole]);

  if (!authStatus) return null; // or a loading spinner
  return <Outlet />;
};


export default ProtectedRoutes
