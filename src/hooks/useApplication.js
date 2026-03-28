// hooks/useApplication.js
// Owns all state and mutations for a single application.
// Optimistic updates: UI changes instantly, rolls back if the API call fails.

import { useState, useEffect, useCallback, useRef } from "react";
import * as applicationService from "../services/applicationsService";

export function useApplication(appId, formData) {
  const [app, setApp]                     = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [actionError, setActionError]     = useState({});

  // Keep a stable ref to `app` so callbacks don't go stale
  const appRef = useRef(app);
  useEffect(() => { appRef.current = app; }, [app]);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!appId) return;

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await applicationService.fetchApplicationByAppId(appId);
        if (!cancelled) setApp(data.payload.application);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [appId]);


  // ── Core mutation helper ───────────────────────────────────────────────────
  //
  // actionKey    — unique string used to track loading/error per button
  //                e.g. "status", "doc_transcript", "comment"
  // optimisticFn — (prevApp) => nextApp  (applied immediately to state)
  // apiFn        — async () => updatedApp  (called in background)
  //                Should return the full updated app from the server.
  //                If your API only returns the changed sub-document,
  //                merge it manually inside apiFn before returning.

  const mutate = useCallback(async (actionKey, optimisticFn, apiFn) => {
    const snapshot = appRef.current; // save for rollback

    setApp(prev => optimisticFn(prev));
    setActionLoading(prev => ({ ...prev, [actionKey]: true }));
    setActionError(prev => ({ ...prev, [actionKey]: null }));

    try {
      const updated = await apiFn();
      // Use server response as source of truth
      setApp(updated);
    } catch (err) {
      // Roll back to pre-mutation state
      setApp(snapshot);
      setActionError(prev => ({ ...prev, [actionKey]:  err.response?.data?.message || err.message }));
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  }, []); // stable — no deps needed because we use appRef

  // ── Application status actions ─────────────────────────────────────────────

  const submitApplication = useCallback(() => {
    mutate(
      "status",
      (prev) => ({ ...prev, status: "submitted" }),
      () => applicationService.submitApplication(formData),
    );
  }, [formData, mutate]);

  const acceptApplication = useCallback(() => {
    mutate(
      "status",
      (prev) => ({ ...prev, status: "accepted" }),
      () => applicationService.updateApplicationStatusInitial(appId, "accepted"),
    );
  }, [appId, mutate]);

  const rejectApplication = useCallback((rejectionFeedback) => {
    mutate(
      "status",
      (prev) => ({ ...prev, status: "rejected" }),
      () => applicationService.updateApplicationStatusInitial(appId, "rejected", rejectionFeedback),
    );
  }, [appId, mutate]);

  const finalApproveApplication = useCallback(() => {
    mutate(
      "status",
      (prev) => ({ ...prev, status: "approved" }),
      () => applicationService.updateApplicationStatusFinal(appId, "approved"),
    );
  }, [appId, mutate]);

  // ── Document actions ───────────────────────────────────────────────────────

  const approveDocument = useCallback((docKey) => {
    mutate(
      `doc_${docKey}`,
      (prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [docKey]: { ...prev.documents[docKey], status: "approved", adminFeedback: null },
        },
      }),
      () => applicationService.updateDocumentStatus(appId, docKey, "approved"),
    );
  }, [appId, mutate]);

  const rejectDocument = useCallback((docKey, adminFeedback) => {
    mutate(
      `doc_${docKey}`,
      (prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [docKey]: { ...prev.documents[docKey], status: "rejected", adminFeedback },
        },
      }),
      () => applicationService.updateDocumentStatus(appId, docKey, "rejected", adminFeedback),
    );
  }, [appId, mutate]);

  // ── Comment actions ────────────────────────────────────────────────────────

  const sendComment = useCallback((message) => {
    // Temporarily add a client-side comment with a temp ID.
    // It gets replaced by the server-saved version after the API resolves.
    const tempId = `temp_${Date.now()}`;
    const tempComment = {
      _id: tempId,
      sender: { first_name: "You", last_name: "", role: "agent" },
      message,
      createdAt: new Date().toISOString(),
    };

    mutate(
      "comment",
      (prev) => ({ ...prev, comments: [...prev.comments, tempComment] }),
      async () => {
        const savedComment = await applicationService.postComment(appId, message);
        const current = appRef.current;
        return {
          ...current,
          comments: [
            ...current.comments.filter((c) => c._id !== tempId),
            savedComment,
          ],
        };
      },
    );
  }, [appId, mutate]);

  // ── Internal note actions ──────────────────────────────────────────────────

  const addInternalNote = useCallback((note) => {
    const tempId = `temp_${Date.now()}`;
    const tempNote = {
      _id: tempId,
      agent: { first_name: "You", last_name: "" },
      note,
      createdAt: new Date().toISOString(),
    };

    mutate(
      "note",
      (prev) => ({ ...prev, internalNotes: [...prev.internalNotes, tempNote] }),
      async () => {
        const savedNote = await applicationService.postInternalNote(appId, note);
        const current = appRef.current;
        return {
          ...current,
          internalNotes: [
            ...current.internalNotes.filter((n) => n._id !== tempId),
            savedNote,
          ],
        };
      },
    );
  }, [appId, mutate]);

  // ── Expose ─────────────────────────────────────────────────────────────────

  return {
    // Data
    app,
    loading,
    error,

    // Per-action states — use actionLoading["status"], actionLoading["doc_transcript"], etc.
    // to show spinners on individual buttons without blocking the whole page
    actionLoading,
    actionError,

    // Application 
    submitApplication,

    // Status actions
    acceptApplication,
    rejectApplication,
    finalApproveApplication,

    // Document actions
    approveDocument,
    rejectDocument,

    // Communication
    sendComment,
    addInternalNote,
  };
}