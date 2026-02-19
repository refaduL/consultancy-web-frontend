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

export const fetchMyApplication = async (id) => {
  try {
    const res = await api.get(`/applications/me`);
    console.log("My Application Response:", res.data);
    return res.data;
  } catch (error) {
    console.error(`Error fetching application ${id}:`, error);
    throw error;
  }
};