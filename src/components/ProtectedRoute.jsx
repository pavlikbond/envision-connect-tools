import React from "react";
import { useUser } from "../contexts/UserContext";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const { isSignedIn, isLoading } = useUser(); // Get isLoading from the context

  if (isLoading) {
    return null; // Or a loading spinner, or some other placeholder.
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
