import api from "../api/axios";

export const fetchApplications = async () => {
  try {
    const res = await api.get("/applications/all");
    return res.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};