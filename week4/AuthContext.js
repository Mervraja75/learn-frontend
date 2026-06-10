import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  async function saveToken(newToken) {
    await SecureStore.setItemAsync("token", newToken);
    setToken(newToken);
  }

  async function clearToken() {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}