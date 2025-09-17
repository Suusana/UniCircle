import { createContext, useContext, useState } from "react";
import { login as apiLogin, logout as apiLogout } from "../utils/http.js";

const AuthContext = createContext(null);

// Erro object analysis helper: pick a meaningful message from various error shapes
function pickErrorMessage(e) {
  return (
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    (typeof e?.response?.data === "string" ? e.response.data : null) ||
    e?.message ||
    "Login failed"
  );
}

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(""); // only store string errors for easy display

  // Login
  const login = async (email, password) => {
    setLoading(true);
    setErr("");
    try {
      const res = await apiLogin(email, password);

      
      if (res?.data?.success === false) {
        const msg = res?.data?.message || "Invalid email or password";
        setErr(msg);
        throw new Error(msg);
      }

      setStudent(res.data);  // assume res.data is the student object
      return res.data;
    } catch (e) {
      const msg = pickErrorMessage(e);
      setErr(msg);           // store string error
      throw new Error(msg);  // re-throw as Error object for caller
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try { await apiLogout(); } catch {}
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ student, loading, err, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
