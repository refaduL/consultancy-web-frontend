import { useState, useEffect, createContext } from "react";
import { loginUser, logoutUser, getCurrentUser } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Load user on app start
   * Checks cookie session via /users/me
   */
  const loadUser = async () => {
  try {
      const data = await getCurrentUser();
      setUser(data.payload.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);


  useEffect(() => {
    console.log("AuthContext User Updated:", user);
  }, [user]);

  /**
   * Login
   */
  const login = async ({ email, password }) => {
    const data = await loginUser({ email, password });
    await loadUser(); 
    return data;
  };

  /**
   * Logout
   */
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    setUser, // optional but useful
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

