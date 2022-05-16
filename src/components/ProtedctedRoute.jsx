import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

function ProtedctedRoute({children}) {
  const { user } = useAppContext();

  if (!user) {
      
      
    return <Navigate to="/" replace />;
  }
  return <>{children} </>;
}

export default ProtedctedRoute;
