import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({children}) {
  const { user } = useAppContext();

  if (!user.isAdmin) {
      
      
    return <Navigate to="/" replace />;
  }
  return <>{children} </>;
}

export default ProtectedAdminRoute;