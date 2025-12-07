import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchDecks } from "../api/apiService";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const { authenticated } = useAuth();
  const [userData, setUserData] = useState(null);

  async function loadUserData() {
    try {
      const response = await fetchDecks(); 
      const data = response.data;          
      setUserData(data);
    } catch (err) {
      console.error("Erro ao carregar dados do usuário:", err);
    }
  }

  useEffect(() => {
    if (authenticated) {
      loadUserData();
    } else {
      setUserData(null);
    }
  }, [authenticated]);

  return (
    <UserDataContext.Provider value={{ userData, reloadUserData: loadUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}
