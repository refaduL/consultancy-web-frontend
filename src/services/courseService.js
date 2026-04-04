// services/courseService.js
// Maps 1-to-1 with courseRouter.js routes.
//
// Backend base: /api/courses
//
// Public
//   GET    /      → fetchCourses(params)
//   GET    /:id   → fetchCourseById(id)
//
// Admin / Agent
//   POST   /      → createCourse(payload)       payload must include { program }
//   PUT    /:id   → updateCourse(id, payload)
//   DELETE /:id   → deleteCourse(id)

import api from "../api/axios";

const BASE = "/courses";

// ─── Public ──────────────────────────────────────────────────────────────────

/**
 * Fetch courses with optional filtering.
 * @param {Object} params  e.g. { program, is_elective, semester, page, limit }
 *                         Pass `program: programId` to get all courses for one program.
 */
export const fetchCourses = async (params = {}) => {
  try {
    const res = await api.get(BASE, { params });
    return res.data; // { success, payload: { courses, total, … } }
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

/**
 * Fetch all courses that belong to a specific program.
 * Convenience wrapper around fetchCourses with `program` param pre-set.
 * @param {string} programId
 * @param {Object} extraParams  Any additional query params.
 */
export const fetchCoursesByProgram = async (programId, extraParams = {}) => {
  return fetchCourses({ program: programId, ...extraParams });
};

/**
 * Fetch a single course by its _id.
 * @param {string} id
 */
export const fetchCourseById = async (id) => {
  try {
    const res = await api.get(`${BASE}/${id}`);
    return res.data; // { success, payload: { course } }
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    throw error;
  }
};

// ─── Admin / Agent ────────────────────────────────────────────────────────────

/**
 * Create a new course.
 * @param {Object} payload  Must include `program` (ObjectId string) and `course_name`.
 *                          Optional: course_code, description, credits, is_elective,
 *                                    semester, prerequisites, syllabus_url.
 */
export const createCourse = async (payload) => {
  try {
    const res = await api.post(BASE, payload);
    return res.data; // { success, payload: { course } }
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

/**
 * Update an existing course.
 * Send only the fields you want to change.
 * @param {string} id
 * @param {Object} payload
 */
export const updateCourse = async (id, payload) => {
  try {
    const res = await api.put(`${BASE}/${id}`, payload);
    return res.data; // { success, payload: { course } }
  } catch (error) {
    console.error(`Error updating course ${id}:`, error);
    throw error;
  }
};

/**
 * Permanently delete a course.
 * @param {string} id
 */
export const deleteCourse = async (id) => {
  try {
    const res = await api.delete(`${BASE}/${id}`);
    return res.data; // { success, message }
  } catch (error) {
    console.error(`Error deleting course ${id}:`, error);
    throw error;
  }
};