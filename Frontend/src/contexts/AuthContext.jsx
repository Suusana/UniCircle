import { createContext, useContext, useState } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  refreshUser as apiRefreshUser,
} from "../utils/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  //saved user to localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    console.log(res);
    if (typeof res.data === "object") {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } else {
      throw new Error(res.data);
    }
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    localStorage.removeItem("user");
  };
  const refreshUser = async () => {
    const res = await apiRefreshUser();
    setUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
