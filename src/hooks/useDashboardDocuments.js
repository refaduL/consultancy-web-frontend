import { useState, useEffect } from "react";
import { fetchMyApplication } from "../services/applicationsService.js";
import { uploadDocuments, deleteDocument } from "../services/documentService.js";
import { DOCUMENT_META } from "../helpers/documentMeta";
import { useToast } from "./useToast.js";

export default function useDashboardDocuments(user) {
  const [documents, setDocuments] = useState([]);
  const [loadingDocKey, setLoadingDocKey] = useState(null);

  const { addToast } = useToast();

  useEffect(() => {
    if (!user) return;
    const docsObj = user?.application?.documents;

    if (!docsObj) {
      setDocuments([]);
      return;
    }

    mapDocuments(docsObj);
  }, [user]);

  const mapDocuments = (docsObj) => {
    const mapped = Object.keys(docsObj).map((key, index) => {
      const doc = docsObj[key];
      const meta = DOCUMENT_META[key] || {};
      return {
        id: index + 1,
        key,
        name: meta.name || key,
        status: doc.status || "not_uploaded",
        uploadedAt: doc.uploadedAt,
        required: doc.required ?? true,
        adminFeedback: doc.feedback,
        url: doc.url,
      };
    });
    setDocuments(mapped);
  };

  const handleUpload = async (field, file) => {
    try {
      setLoadingDocKey(field);
      const formData = new FormData();
      formData.append(field, file);
      const res = await uploadDocuments(formData);
      mapDocuments(res.payload.documents);
      addToast({
        type: "success",
        title: res.data.message || "Document Uploaded",
        description: `${DOCUMENT_META[field]?.name || field} uploaded successfully!`,
      });
    } catch (error) {
      console.log("Upload Error:", error);
      addToast({
        type: "error",
        title: "Upload Failed",
        description: error.response?.data?.message || "Failed to upload document",
      });
    } finally {
      setLoadingDocKey(null);
    }
  };

  const handleDelete = async (field) => {
    try {
      setLoadingDocKey(field);
      const res = await deleteDocument(field);
      mapDocuments(res.payload.documents);
    } catch (error) {
      addToast({
        type: "error",
        title: "Delete Failed",
        description: error.response?.data?.message || "Failed to delete document",
      });
    } finally {
      setLoadingDocKey(null);
    }
  };

  const uploaded = documents.filter(d => d.status !== "not_uploaded").length;
  const total = documents.length;
  const completion = Math.round((uploaded / total) * 100) || 0;

  return {
    documents,
    loadingDocKey,
    handleUpload,
    handleDelete,
    uploaded,
    total,
    completion
  };
}
