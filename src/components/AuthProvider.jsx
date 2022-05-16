import React from "react";
import AuthContext from "../contexts/AuthContext";

function AuthProvider({ children }) {
//   const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [activeUser, setActiveUser] = useState(null);
  const [token, SetToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{ activeUser, token, onLogin: handleLogin, onLogout: handleLogout }}
    >
        {!isAuthLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
