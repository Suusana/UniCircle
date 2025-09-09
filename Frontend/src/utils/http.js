import axios from "axios";

//encapsulate axios for easy using
export const http = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    withCredentials: true //send cookies with requests
})

//login function
export const login = (email, password) => {
    return http.post('/login', {email, password});
}

//logout function
export const logout = () => {
    return http.post('/logout');
}

//register function
export const signup = (fullName, email, yearLevel, major, password) => {
    // fullName -> firstName / lastName
    const parts = (fullName ?? "").trim().split(/\s+/);
    const lastName  = parts.length > 1 ? parts.pop() : "";
    const firstName = parts.join(" ");
  
    // yearLevel -> degree / year
    const degree = yearLevel === "Masters" ? "Master"
                 : yearLevel === "PhD"     ? "PhD"
                 : "Bachelor";
    const yearMap = { Y1: 1, Y2: 2, Y3: 3, Y4_plus: 4 };
    const year = yearMap[yearLevel] ?? 1;
  
    // send to backend
    return http.post("/signup", {
      email,
      password,
      firstName,
      lastName,
      degree,
      major,
      year,
    });
  };

export default http;