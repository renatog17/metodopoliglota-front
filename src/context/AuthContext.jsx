import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    setLoading(true);

    try {
      const response = await checkLoginRequest();
      const data = response.data;

      if (data.authenticated) {
        setUser({ username: data.user });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
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
  }
  
  async function logout() {
    await logoutRequest();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
