// services/scholarshipService.js
// Maps 1-to-1 with scholarshipRouter.js routes.
//
// Backend base: /api/scholarships
//
// Public
//   GET    /      → fetchScholarships(params)
//   GET    /:id   → fetchScholarshipById(id)
//
// Admin / Agent
//   POST   /      → createScholarship(payload)    payload must include { university }
//   PUT    /:id   → updateScholarship(id, payload)
//   DELETE /:id   → deleteScholarship(id)

import api from "../api/axios";

const BASE = "/scholarships";

// ─── Public ──────────────────────────────────────────────────────────────────

/**
 * Fetch scholarships with optional filtering.
 * @param {Object} params  e.g. { university, program, is_active, page, limit }
 *                         Pass `university: uniId` for all scholarships of one university.
 *                         Pass `program: programId` for program-specific scholarships.
 */
export const fetchScholarships = async (params = {}) => {
  try {
    const res = await api.get(BASE, { params });
    return res.data; // { success, payload: { scholarships, total, … } }
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    throw error;
  }
};

/**
 * Fetch all scholarships for a specific university (university-wide + program-linked).
 * Convenience wrapper around fetchScholarships with `university` param pre-set.
 * @param {string} universityId
 * @param {Object} extraParams
 */
export const fetchScholarshipsByUniversity = async (universityId, extraParams = {}) => {
  return fetchScholarships({ university_id: universityId, ...extraParams });
};

/**
 * Fetch scholarships linked to a specific program.
 * @param {string} programId
 * @param {Object} extraParams
 */
export const fetchScholarshipsByProgram = async (programId, extraParams = {}) => {
  return fetchScholarships({ program: programId, ...extraParams });
};

/**
 * Fetch a single scholarship by its _id.
 * @param {string} id
 */
export const fetchScholarshipById = async (id) => {
  try {
    const res = await api.get(`${BASE}/${id}`);
    return res.data; // { success, payload: { scholarship } }
  } catch (error) {
    console.error(`Error fetching scholarship ${id}:`, error);
    throw error;
  }
};

// ─── Admin / Agent ────────────────────────────────────────────────────────────

/**
 * Create a new scholarship.
 * @param {Object} payload  Must include `university`, `scholarship_name`, `amount`, `description`.
 *                          Optional: program (ObjectId | null), eligible_nationalities,
 *                                    eligibility_criteria, deadline, is_active, scholarship_url.
 */
export const createScholarship = async (payload) => {
  try {
    const res = await api.post(BASE, payload);
    return res.data; // { success, payload: { scholarship } }
  } catch (error) {
    console.error("Error creating scholarship:", error);
    throw error;
  }
};

/**
 * Update an existing scholarship.
 * Send only the fields you want to change.
 * @param {string} id
 * @param {Object} payload
 */
export const updateScholarship = async (id, payload) => {
  try {
    const res = await api.put(`${BASE}/${id}`, payload);
    return res.data; // { success, payload: { scholarship } }
  } catch (error) {
    console.error(`Error updating scholarship ${id}:`, error);
    throw error;
  }
};

/**
 * Permanently delete a scholarship.
 * @param {string} id
 */
export const deleteScholarship = async (id) => {
  try {
    const res = await api.delete(`${BASE}/${id}`);
    return res.data; // { success, message }
  } catch (error) {
    console.error(`Error deleting scholarship ${id}:`, error);
    throw error;
  }
};