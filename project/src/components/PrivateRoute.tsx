import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  // If no user is logged in, redirect to "/"
  if (!user) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the child component
  return children;
};

export default PrivateRoute;
