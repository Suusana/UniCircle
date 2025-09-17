import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, logout as apiLogout, me as apiMe } from "../utils/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);

  // 启动时尝试恢复会话
  useEffect(() => {
    apiMe().then(res => {
      if (typeof res.data === "object") {
        setStudent(res.data);
      }
    });
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    if (typeof res.data === "object") {
      setStudent(res.data);
    } else {
      alert(res.data); // 比如显示 "Invalid email or password"
    }
  };

  const logout = async () => {
    await apiLogout();
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ student, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
