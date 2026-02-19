import api from "../api/axios";

/**
 * REGISTER USER
 */
export const registerUser = async (userData) => {
  try {
    const { data } = await api.post("/auth/register", userData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

/**
 * ACTIVATE USER ACCOUNT
 */
export const activateUserAccount = async (token) => {
  try {
    const { data } = await api.get(`/auth/activate/${token}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Account activation failed";
  }
};

/**
 * LOGIN USER
 * Cookie will be automatically set by backend (HttpOnly)
 */
export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    console.log("Login Response:", data);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

/**
 * GET CURRENT AUTHENTICATED USER
 */
export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Not authenticated";
  }
};

/**
 * LOGOUT USER
 * Clears cookie from backend
 */
export const logoutUser = async () => {
  try {
    const { data } = await api.post("/auth/logout");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Logout failed";
  }
};
