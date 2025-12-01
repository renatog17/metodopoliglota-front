import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    setLoading(true);

    const response = await fetch(`${API}/auth/check`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.authenticated) {
        setUser({ username: data.user });
      } else {
        setUser(null);
      }
    }

    setLoading(false);
  }

  async function login(email, password) {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      await checkLogin();
      return true;
    }

    return false;
  }

  async function logout() {
    await fetch(`${API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

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
