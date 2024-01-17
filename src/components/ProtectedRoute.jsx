import React from "react";
import { useUser } from "../contexts/UserContext";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const { isSignedIn } = useUser();
  return isSignedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
