import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  async function saveToken(newToken, userData) {
    await SecureStore.setItemAsync("token", newToken);
    setToken(newToken);
    if (userData) {
      setUser(userData);
    }
  }

  async function clearToken() {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}