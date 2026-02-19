import api from "../api/axios";

// Upload documents (multiple or single)
export const uploadDocuments = async (formData) => {
  try {
    const res = await api.put(
      "/applications/upload-docs",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error uploading documents:", error);
    throw error;
  }
};

// Delete single document
export const deleteDocument = async (field) => {
  try {
    const res = await api.delete(`/documents/${field}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
