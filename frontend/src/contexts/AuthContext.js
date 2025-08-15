import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { setup403Interceptor } from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const login = useCallback((token) => {
    localStorage.setItem("token", token);
    setAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    setup403Interceptor(logout);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
