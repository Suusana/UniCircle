import axios from "axios";


export const http = axios.create({
  baseURL: "http://localhost:8080",          
  timeout: 5000,
  withCredentials: true // allow sending cookies
});

// login/logout/me APIs for AuthContext
export const login = (email, password) => http.post("/api/auth/login", { email, password });
export const logout = () => http.post("/api/auth/logout");

export const signup = (fullName, email, yearLevel, major, password) => {
  const parts = (fullName ?? "").trim().split(/\s+/);
  const lastName  = parts.length > 1 ? parts.pop() : "";
  const firstName = parts.join(" ");

  const degree = yearLevel === "Masters" ? "Master"
               : yearLevel === "PhD"     ? "PhD"
               : "Bachelor";
  const yearMap = { Y1: 1, Y2: 2, Y3: 3, Y4_plus: 4 };
  const year = yearMap[yearLevel] ?? 1;

  return http.post("/signup", {
    email, password, firstName, lastName, degree, major, year,
  });
};

export default http;
