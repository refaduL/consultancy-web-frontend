// services/programService.js
// Maps 1-to-1 with programRouter.js routes.
//
// Backend base: /api/programs
//
// Public
//   GET    /      → fetchPrograms(params)
//   GET    /:id   → fetchProgramById(id)
//
// Admin / Agent
//   POST   /      → createProgram(payload)       payload must include { university }
//   PUT    /:id   → updateProgram(id, payload)
//   DELETE /:id   → deleteProgram(id)

import api from "../api/axios";

const BASE = "/programs";

// ─── Public ──────────────────────────────────────────────────────────────────

/**
 * Fetch programs with optional filtering.
 * @param {Object} params  e.g. { university, degree_level, field_of_study, page, limit }
 *                         Pass `university: uniId` to get all programs for one university.
 */
export const fetchPrograms = async (params = {}) => {
  try {
    const res = await api.get(BASE, { params });
    return res.data; // { success, payload: { programs, total, … } }
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }
};

/**
 * Fetch programs that belong to a specific university.
 * Convenience wrapper around fetchPrograms with `university` param pre-set.
 * @param {string} universityId
 * @param {Object} extraParams  Any additional query params.
 */
export const fetchProgramsByUniversity = async (universityId, extraParams = {}) => {
  return fetchPrograms({ university_id: universityId, ...extraParams });
};

/**
 * Fetch a single program by its _id.
 * The backend populates virtual `courses` and `scholarships` when requested.
 * @param {string} id
 */
export const fetchProgramById = async (id) => {
  try {
    const res = await api.get(`${BASE}/${id}`);
    return res.data; // { success, payload: { program } }
  } catch (error) {
    console.error(`Error fetching program ${id}:`, error);
    throw error;
  }
};

// ─── Admin / Agent ────────────────────────────────────────────────────────────

/**
 * Create a new program.
 * @param {Object} payload  Must include `university` (ObjectId string).
 *                          All other fields from programSchema are optional unless
 *                          marked required (program_name, degree_level, field_of_study, duration).
 */
export const createProgram = async (payload) => {
  try {
    const res = await api.post(BASE, payload);
    return res.data; // { success, payload: { program } }
  } catch (error) {
    console.error("Error creating program:", error);
    throw error;
  }
};

/**
 * Update an existing program.
 * Send only the fields you want to change.
 * @param {string} id
 * @param {Object} payload
 */
export const updateProgram = async (id, payload) => {
  try {
    const res = await api.put(`${BASE}/${id}`, payload);
    return res.data; // { success, payload: { program } }
  } catch (error) {
    console.error(`Error updating program ${id}:`, error);
    throw error;
  }
};

/**
 * Permanently delete a program.
 * @param {string} id
 */
export const deleteProgram = async (id) => {
  try {
    const res = await api.delete(`${BASE}/${id}`);
    return res.data; // { success, message }
  } catch (error) {
    console.error(`Error deleting program ${id}:`, error);
    throw error;
  }
};