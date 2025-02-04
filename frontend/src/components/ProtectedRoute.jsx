// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEnrollmentDetails, setUser } from "../../redux/features/user/userSlice.js";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchEnrollmentDetails = async () =>{
      try {
        const date  = new Date();
        const month = date.getMonth()+1;
        const response = await fetch(`https://flexmoney-assignment-a3zx.onrender.com/api/enroll/${month}/month`);
        const data = await response.json();
        dispatch(setEnrollmentDetails(data));
      } catch (error) {
        console.log("error",error);
      }
    }
    const checkAuth = async () => {
      try {
        const response = await fetch("https://flexmoney-assignment-a3zx.onrender.com/api/user/authcheck");
        const data = await response.json();
        if (data.authenticated) {
          setIsAuthenticated(data.authenticated);
          dispatch(setUser(data));
          fetchEnrollmentDetails();
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // While loading, you could return a spinner or loader
  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
