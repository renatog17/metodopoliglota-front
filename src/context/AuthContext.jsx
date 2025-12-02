import { createContext, useState, useEffect, useContext } from "react";
import {
  checkLoginRequest,
  loginRequest,
  logoutRequest,
} from "../api/apiService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    setLoading(true);
    try {
      const response = await checkLoginRequest();
      const data = response.data;

      if (data.authenticated === true) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch {
      setAuthenticated(false);
    }
    setLoading(false);
  }

  async function login(email, password) {
    try {
      const response = await loginRequest(email, password);
      if (response.status === 200) {
        await checkLogin();
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }

  async function logout() {
    await logoutRequest();
    setAuthenticated(false);
  }
  return (
   <AuthContext.Provider value={{ authenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
