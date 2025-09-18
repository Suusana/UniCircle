import { useState, useEffect } from "react";
import { me } from "../utils/http";

export default function useUser() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await me();  
      console.log("Current user:", res.data);
      setUser(res.data);
    } catch (err) {
      console.log("Not logged in:", err?.response?.status);
      setUser(null);
    }
  };

  // automatically get the login user when loading
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, setUser, refreshUser: fetchUser };
}
