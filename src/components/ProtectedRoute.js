import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    // Redirect to login if the user is not an admin
    return <Navigate to="/login" />;
  }
  // Render the children if the user is an admin
  return children;
};

export default ProtectedRoute;
