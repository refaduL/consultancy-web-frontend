import api from "../api/axios";

export const fetchUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
};

export const fetchUserById = async (userId) => {
  try {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user by ID: ", error);
  }
};

