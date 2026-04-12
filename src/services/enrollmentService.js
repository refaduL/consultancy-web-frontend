import api from "../api/axios";

export const submitEnrollmentForm = async (formData) => {
  try {
    const res = await api.post("/enrollments", formData);
    console.log("Submit Enrollment Form Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error submitting enrollment form:", error);
    throw error;
  }
};

// fetch all user's enrollments
export const fetchAllEnrollments = async () => {
  const response = await api.get("/enrollments");
  return response.data;
};

// fetch the logged-in user's enrollments
export const fetchMyEnrollments = async () => {
  const response = await api.get("/enrollments/my");
  return response.data;
};

// confirm an enrollment by id
export const confirmEnrollment = async (enrollmentId) => {
  const response = await api.patch(`/enrollments/${enrollmentId}/confirm`);
  return response.data;
};

// cancel an enrollment by id
export const cancelEnrollment = async (enrollmentId) => {
  const response = await api.patch(`/enrollments/${enrollmentId}/cancel`);
  return response.data;
};



// PATCH /api/enrollments/admin/:id/status  — confirm or cancel
export const updateEnrollmentStatus = async (enrollmentId, status) => {
  const response = await api.put(
    `/enrollments/${enrollmentId}/status`,
    { status }
  );
  return response.data;
};

// DELETE /api/enrollments/admin/:id  — hard delete
export const deleteEnrollment = async (enrollmentId) => {
  const response = await api.delete(`/enrollments/${enrollmentId}`);
  return response.data;
};
 