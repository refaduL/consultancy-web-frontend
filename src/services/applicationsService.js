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


// ─── Application ─────────────────────────────────────────────

export const fetchApplicationByAppId = async (appId) => { 
  try {
    const res = await api.get(`/applications/${appId}`);
    console.log("Application Response:", res.data);
    return res.data;
  } catch (error) {
    console.error(`Error fetching application ${appId}:`, error);
    throw error;
  }
};

export const submitApplication = async (applicationData) => {
  try {
    const res = await api.post("/applications/submit", applicationData);
    console.log("Submit Application Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

export const updateApplicationStatusInitial = async (
  appId,
  status,
  rejectionFeedback = null
) => {
  try {
    const res = await api.put(`/applications/${appId}/initial-review`, {
      review: status,
      ...(rejectionFeedback && { rejectionFeedback }),
    });
    return res.data;
  } catch (error) {
    console.error(
      `Error updating application status for ${appId}:`,
      error
    );
    throw error;
  }
};

export const updateApplicationStatusFinal = async (
  appId,
  status,
  rejectionFeedback = null
) => {
  try {
    const res = await api.put(`/applications/${appId}/final-review`, {
      review: status,
      ...(rejectionFeedback && { rejectionFeedback }),
    });
    return res.data;
  } catch (error) {
    console.error(
      `Error updating application status for ${appId}:`,
      error
    );
    throw error;
  }
};

// ─── Documents ───────────────────────────────────────────────

export const updateDocumentStatus = async (
  appId,
  docKey,
  status,
  adminFeedback = null
) => {
  try {
    const res = await api.put(
      `/applications/${appId}/documents/${docKey}`,
      {
        status,
        ...(adminFeedback && { adminFeedback }),
      }
    );
    console.log("Update Document Status Response:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      `Error updating document ${docKey} for application ${appId}:`,
      error
    );
    throw error;
  }
};

// ─── Comments ────────────────────────────────────────────────

export const postComment = async (appId, message) => {
  try {
    const res = await api.post(`/applications/${appId}/comments`, {
      message,
    });
    console.log("Post Comment Response:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      `Error posting comment for application ${appId}:`,
      error
    );
    throw error;
  }
};

// ─── Internal Notes ──────────────────────────────────────────

export const postInternalNote = async (appId, note) => {
  try {
    const res = await api.post(`/applications/${appId}/notes`, {
      note,
    });
    console.log("Post Internal Note Response:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      `Error posting internal note for application ${appId}:`,
      error
    );
    throw error;
  }
};