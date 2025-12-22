import api from "../api/axios";

export const fetchUniversities = async () => {
  try {
    const res = await api.get("/universities");
    return res.data;
  } catch (error) {
    console.error("Error fetching universities: ", error);
  }
};

export const fetchUniversityById = async (universityId) => {
  try {
    const res = await api.get(`/universities/${universityId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching university by ID: ", error);
  }
};

export const createUniversity = async (universityData) => {
  try {
    const res = await api.post("/universities", universityData);
    return res.data;
  } catch (error) {
    console.error("Error creating university: ", error);
  }
};

export const updateUniversity = async (universityId, universityData) => {
  try {
    const res = await api.put(`/universities/${universityId}`, universityData);
    return res.data;
  } catch (error) {
    console.error("Error updating university: ", error);
  }
};

export const deleteUniversity = async (universityId) => {
  try {
    const res = await api.delete(`/universities/${universityId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting university: ", error);
  }
};
