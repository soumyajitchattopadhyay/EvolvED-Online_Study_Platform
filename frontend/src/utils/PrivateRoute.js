import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthToken } from "./auth"; 

const PrivateRoute = ({ element }) => {
  const token = getAuthToken();
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
