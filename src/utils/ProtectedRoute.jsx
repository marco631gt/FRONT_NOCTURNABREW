import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("userRole") === "administrator";
  const token = localStorage.getItem("userToken");

  if (!token) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/menu" replace />;

  return children;
};

export default ProtectedRoute;
