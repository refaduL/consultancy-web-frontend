// hooks/useUniversity.js
//
// Owns all state and mutations for the UniversityDetailPage.
// Covers: University · Programs · Courses (per-program) · Scholarships
//
// Design mirrors useApplication.js:
//   - One `mutate()` helper for optimistic updates + rollback
//   - Per-action loading/error via actionLoading[key] / actionError[key]
//   - Stable callbacks via useCallback + refs (no stale-closure bugs)
//
// Usage:
//   const {
//     university, programs, scholarships,
//     loading, error,
//     actionLoading, actionError,
//     updateUniversity, deleteUniversity,
//     createProgram, updateProgram, deleteProgram,
//     fetchCoursesForProgram, createCourse, updateCourse, deleteCourse,
//     createScholarship, updateScholarship, deleteScholarship,
//   } = useUniversity(universityId);

import { useState, useEffect, useCallback, useRef } from "react";
import * as universityService  from "../services/universityService";
import * as programService     from "../services/programService";
import * as courseService      from "../services/courseService";
import * as scholarshipService from "../services/scholarshipService";

export function useUniversity(universityId) {

  // ── Core state ─────────────────────────────────────────────────────────────

  const [university,   setUniversity]   = useState(null);
  const [programs,     setPrograms]     = useState([]);
  const [scholarships, setScholarships] = useState([]);

  // courses are stored per-program: { [programId]: Course[] }
  const [courseMap, setCourseMap] = useState({});

  // Page-level fetch state
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // Secondary lazy-load states (programs / scholarships tabs)
  const [programsLoading,     setProgramsLoading]     = useState(false);
  const [programsLoaded,      setProgramsLoaded]      = useState(false);
  const [scholarshipsLoading, setScholarshipsLoading] = useState(false);
  const [scholarshipsLoaded,  setScholarshipsLoaded]  = useState(false);

  // Per-action loading & error  (same pattern as useApplication)
  const [actionLoading, setActionLoading] = useState({});
  const [actionError,   setActionError]   = useState({});

  // ── Stable refs ─────────────────────────────────────────────────────────────
  // Prevents stale closures in callbacks that need the latest state

  const universityRef   = useRef(university);
  const programsRef     = useRef(programs);
  const scholarshipsRef = useRef(scholarships);
  const courseMapRef    = useRef(courseMap);

  useEffect(() => { universityRef.current   = university;   }, [university]);
  useEffect(() => { programsRef.current     = programs;     }, [programs]);
  useEffect(() => { scholarshipsRef.current = scholarships; }, [scholarships]);
  useEffect(() => { courseMapRef.current    = courseMap;    }, [courseMap]);

  // ── Generic mutation helper ─────────────────────────────────────────────────
  //
  // actionKey    — unique string key, e.g. "updateUniversity", "deleteProgram_<id>"
  // optimisticFn — () => void   — apply immediate state change
  // apiFn        — async () => void   — make the API call
  // rollbackFn   — () => void   — restore state if apiFn throws
  //
  // Unlike useApplication's mutate (which only manages a single `app` doc),
  // here we operate on several independent state slices, so optimistic and
  // rollback logic is passed in as explicit functions rather than a transform.

  const mutate = useCallback(async (actionKey, optimisticFn, apiFn, rollbackFn) => {
    optimisticFn();

    setActionLoading(prev => ({ ...prev, [actionKey]: true  }));
    setActionError  (prev => ({ ...prev, [actionKey]: null  }));

    try {
      await apiFn();
    } catch (err) {
      rollbackFn();
      setActionError(prev => ({
        ...prev,
        [actionKey]: err.response?.data?.message || err.message,
      }));
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  }, []);

  // ── Error extractor ─────────────────────────────────────────────────────────

  const extractError = (err) => err.response?.data?.message || err.message;

  // ══════════════════════════════════════════════════════════════════════════════
  // UNIVERSITY
  // ══════════════════════════════════════════════════════════════════════════════

  // ── Initial load ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!universityId) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await universityService.fetchUniversityById(universityId);
        if (!cancelled) setUniversity(data.payload.university);
      } catch (err) {
        if (!cancelled) setError(extractError(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [universityId]);

  // ── Update university ─────────────────────────────────────────────────────────

  /**
   * Update university fields.
   * @param {Object} payload  Only the fields you want to change.
   * @returns {Promise<boolean>}  true on success, false on failure.
   */
  const updateUniversity = useCallback(async (payload) => {
    const snapshot = universityRef.current;
    let success = false;

    await mutate(
      "updateUniversity",
      () => setUniversity(prev => ({ ...prev, ...payload })),
      async () => {
        const data = await universityService.updateUniversity(universityId, payload);
        // Use server response as source of truth
        setUniversity(data.payload.university);
        success = true;
      },
      () => setUniversity(snapshot),
    );

    return success;
  }, [universityId, mutate]);

  // ── Delete university ─────────────────────────────────────────────────────────

  /**
   * Delete the university. The caller is responsible for navigation after success.
   * @returns {Promise<boolean>}
   */
  const deleteUniversity = useCallback(async () => {
    let success = false;

    await mutate(
      "deleteUniversity",
      () => {},                                   // no optimistic UI needed; caller navigates away
      async () => {
        await universityService.deleteUniversity(universityId);
        success = true;
      },
      () => {},                                   // nothing to roll back
    );

    return success;
  }, [universityId, mutate]);

  // ══════════════════════════════════════════════════════════════════════════════
  // PROGRAMS
  // ══════════════════════════════════════════════════════════════════════════════

  // ── Lazy-load programs ────────────────────────────────────────────────────────

  /**
   * Load all programs for this university.
   * Call once when the user opens the Programs tab.
   * Subsequent calls are no-ops (already loaded).
   */
  const loadPrograms = useCallback(async () => {
    if (programsLoaded) return;

    setProgramsLoading(true);
    try {
      const data = await programService.fetchProgramsByUniversity(universityId);
      setPrograms(data.payload.programs ?? []);
      setProgramsLoaded(true);
    } catch (err) {
      setActionError(prev => ({ ...prev, loadPrograms: extractError(err) }));
    } finally {
      setProgramsLoading(false);
    }
  }, [universityId, programsLoaded]);

  // ── Create program ────────────────────────────────────────────────────────────

  /**
   * Create a new program under this university.
   * @param {Object} payload  programSchema fields; `university` is injected automatically.
   * @returns {Promise<Object|null>}  The created program, or null on failure.
   */
  const createProgram = useCallback(async (payload) => {
    const fullPayload = { ...payload, university: universityId };
    let created = null;

    await mutate(
      "createProgram",
      () => {},                                   // wait for server; don't add a temp row
      async () => {
        const data = await programService.createProgram(fullPayload);
        created = data.payload.program;
        setPrograms(prev => [...prev, created]);
      },
      () => {},
    );

    return created;
  }, [universityId, mutate]);

  // ── Update program ────────────────────────────────────────────────────────────

  /**
   * Update an existing program.
   * @param {string} programId
   * @param {Object} payload
   * @returns {Promise<boolean>}
   */
  const updateProgram = useCallback(async (programId, payload) => {
    const snapshot = programsRef.current;
    let success = false;

    await mutate(
      `updateProgram_${programId}`,
      () => setPrograms(prev =>
        prev.map(p => p._id === programId ? { ...p, ...payload } : p)
      ),
      async () => {
        const data = await programService.updateProgram(programId, payload);
        const updated = data.payload.program;
        setPrograms(prev => prev.map(p => p._id === programId ? updated : p));
        success = true;
      },
      () => setPrograms(snapshot),
    );

    return success;
  }, [mutate]);

  // ── Delete program ────────────────────────────────────────────────────────────

  /**
   * Delete a program. Also removes its courses from courseMap.
   * @param {string} programId
   * @returns {Promise<boolean>}
   */
  const deleteProgram = useCallback(async (programId) => {
    const snapshotPrograms  = programsRef.current;
    const snapshotCourseMap = courseMapRef.current;
    let success = false;

    await mutate(
      `deleteProgram_${programId}`,
      () => {
        setPrograms(prev => prev.filter(p => p._id !== programId));
        setCourseMap(prev => {
          const next = { ...prev };
          delete next[programId];
          return next;
        });
      },
      async () => {
        await programService.deleteProgram(programId);
        success = true;
      },
      () => {
        setPrograms(snapshotPrograms);
        setCourseMap(snapshotCourseMap);
      },
    );

    return success;
  }, [mutate]);

  // ══════════════════════════════════════════════════════════════════════════════
  // COURSES  (per-program, lazy-loaded when the card is expanded)
  // ══════════════════════════════════════════════════════════════════════════════

  // ── Lazy-load courses for a program ──────────────────────────────────────────

  /**
   * Load courses for a specific program.
   * Keyed by programId in courseMap — subsequent calls are no-ops.
   * @param {string} programId
   */
  const fetchCoursesForProgram = useCallback(async (programId) => {
    if (courseMapRef.current[programId]) return; // already loaded

    setActionLoading(prev => ({ ...prev, [`loadCourses_${programId}`]: true }));
    try {
      const data = await courseService.fetchCoursesByProgram(programId);
      setCourseMap(prev => ({ ...prev, [programId]: data.payload.courses ?? [] }));
    } catch (err) {
      setActionError(prev => ({
        ...prev,
        [`loadCourses_${programId}`]: extractError(err),
      }));
    } finally {
      setActionLoading(prev => ({ ...prev, [`loadCourses_${programId}`]: false }));
    }
  }, []);

  // ── Create course ─────────────────────────────────────────────────────────────

  /**
   * Create a new course under a program.
   * @param {string} programId
   * @param {Object} payload  courseSchema fields; `program` is injected automatically.
   * @returns {Promise<Object|null>}  The created course, or null on failure.
   */
  const createCourse = useCallback(async (programId, payload) => {
    const fullPayload = { ...payload, program: programId };
    let created = null;

    await mutate(
      `createCourse_${programId}`,
      () => {},
      async () => {
        const data = await courseService.createCourse(fullPayload);
        created = data.payload.course;
        setCourseMap(prev => ({
          ...prev,
          [programId]: [...(prev[programId] ?? []), created],
        }));
      },
      () => {},
    );

    return created;
  }, [mutate]);

  // ── Update course ─────────────────────────────────────────────────────────────

  /**
   * Update an existing course.
   * @param {string} programId  Parent program (needed to locate the course in courseMap).
   * @param {string} courseId
   * @param {Object} payload
   * @returns {Promise<boolean>}
   */
  const updateCourse = useCallback(async (programId, courseId, payload) => {
    const snapshot = courseMapRef.current;
    let success = false;

    await mutate(
      `updateCourse_${courseId}`,
      () => setCourseMap(prev => ({
        ...prev,
        [programId]: (prev[programId] ?? []).map(c =>
          c._id === courseId ? { ...c, ...payload } : c
        ),
      })),
      async () => {
        const data = await courseService.updateCourse(courseId, payload);
        const updated = data.payload.course;
        setCourseMap(prev => ({
          ...prev,
          [programId]: (prev[programId] ?? []).map(c => c._id === courseId ? updated : c),
        }));
        success = true;
      },
      () => setCourseMap(snapshot),
    );

    return success;
  }, [mutate]);

  // ── Delete course ─────────────────────────────────────────────────────────────

  /**
   * Delete a course.
   * @param {string} programId  Parent program.
   * @param {string} courseId
   * @returns {Promise<boolean>}
   */
  const deleteCourse = useCallback(async (programId, courseId) => {
    const snapshot = courseMapRef.current;
    let success = false;

    await mutate(
      `deleteCourse_${courseId}`,
      () => setCourseMap(prev => ({
        ...prev,
        [programId]: (prev[programId] ?? []).filter(c => c._id !== courseId),
      })),
      async () => {
        await courseService.deleteCourse(courseId);
        success = true;
      },
      () => setCourseMap(snapshot),
    );

    return success;
  }, [mutate]);

  // ══════════════════════════════════════════════════════════════════════════════
  // SCHOLARSHIPS
  // ══════════════════════════════════════════════════════════════════════════════

  // ── Lazy-load scholarships ────────────────────────────────────────────────────

  /**
   * Load all scholarships for this university.
   * Call once when the user opens the Scholarships tab.
   */
  const loadScholarships = useCallback(async () => {
    if (scholarshipsLoaded) return;

    setScholarshipsLoading(true);
    try {
      const data = await scholarshipService.fetchScholarshipsByUniversity(universityId);
      setScholarships(data.payload.scholarships ?? []);
      setScholarshipsLoaded(true);
    } catch (err) {
      setActionError(prev => ({ ...prev, loadScholarships: extractError(err) }));
    } finally {
      setScholarshipsLoading(false);
    }
  }, [universityId, scholarshipsLoaded]);

  // ── Create scholarship ────────────────────────────────────────────────────────

  /**
   * Create a new scholarship.
   * @param {Object} payload  scholarshipSchema fields; `university` is injected automatically.
   * @returns {Promise<Object|null>}  The created scholarship, or null on failure.
   */
  const createScholarship = useCallback(async (payload) => {
    const fullPayload = { ...payload, university: universityId };
    let created = null;

    await mutate(
      "createScholarship",
      () => {},
      async () => {
        const data = await scholarshipService.createScholarship(fullPayload);
        created = data.payload.scholarship;
        setScholarships(prev => [...prev, created]);
      },
      () => {},
    );

    return created;
  }, [universityId, mutate]);

  // ── Update scholarship ────────────────────────────────────────────────────────

  /**
   * Update an existing scholarship.
   * @param {string} scholarshipId
   * @param {Object} payload
   * @returns {Promise<boolean>}
   */
  const updateScholarship = useCallback(async (scholarshipId, payload) => {
    const snapshot = scholarshipsRef.current;
    let success = false;

    await mutate(
      `updateScholarship_${scholarshipId}`,
      () => setScholarships(prev =>
        prev.map(s => s._id === scholarshipId ? { ...s, ...payload } : s)
      ),
      async () => {
        const data = await scholarshipService.updateScholarship(scholarshipId, payload);
        const updated = data.payload.scholarship;
        setScholarships(prev => prev.map(s => s._id === scholarshipId ? updated : s));
        success = true;
      },
      () => setScholarships(snapshot),
    );

    return success;
  }, [mutate]);

  // ── Delete scholarship ────────────────────────────────────────────────────────

  /**
   * Delete a scholarship.
   * @param {string} scholarshipId
   * @returns {Promise<boolean>}
   */
  const deleteScholarship = useCallback(async (scholarshipId) => {
    const snapshot = scholarshipsRef.current;
    let success = false;

    await mutate(
      `deleteScholarship_${scholarshipId}`,
      () => setScholarships(prev => prev.filter(s => s._id !== scholarshipId)),
      async () => {
        await scholarshipService.deleteScholarship(scholarshipId);
        success = true;
      },
      () => setScholarships(snapshot),
    );

    return success;
  }, [mutate]);

  // ══════════════════════════════════════════════════════════════════════════════
  // EXPOSE
  // ══════════════════════════════════════════════════════════════════════════════

  return {
    // ── State ────────────────────────────────────────────────────────────────
    university,
    programs,
    scholarships,
    courseMap,          // { [programId]: Course[] }  — access as courseMap[programId] ?? []

    // Page-level fetch
    loading,            // true while the initial university GET is in flight
    error,              // string | null

    // Secondary fetch states (for tab skeletons)
    programsLoading,
    programsLoaded,
    scholarshipsLoading,
    scholarshipsLoaded,

    // Per-action states — use these to drive individual button spinners
    // Keys follow the pattern used in each mutate() call above:
    //   "updateUniversity"           "deleteUniversity"
    //   "createProgram"              "updateProgram_<id>"       "deleteProgram_<id>"
    //   "loadCourses_<programId>"    "createCourse_<programId>"
    //   "updateCourse_<courseId>"    "deleteCourse_<courseId>"
    //   "createScholarship"          "updateScholarship_<id>"   "deleteScholarship_<id>"
    actionLoading,
    actionError,

    // ── University actions ────────────────────────────────────────────────────
    updateUniversity,   // (payload)             → Promise<boolean>
    deleteUniversity,   // ()                    → Promise<boolean>  (navigate after)

    // ── Program actions ───────────────────────────────────────────────────────
    loadPrograms,       // ()                    → Promise<void>  (call on tab open)
    createProgram,      // (payload)             → Promise<program | null>
    updateProgram,      // (programId, payload)  → Promise<boolean>
    deleteProgram,      // (programId)           → Promise<boolean>

    // ── Course actions ────────────────────────────────────────────────────────
    fetchCoursesForProgram, // (programId)                         → Promise<void>
    createCourse,           // (programId, payload)                → Promise<course | null>
    updateCourse,           // (programId, courseId, payload)      → Promise<boolean>
    deleteCourse,           // (programId, courseId)               → Promise<boolean>

    // ── Scholarship actions ───────────────────────────────────────────────────
    loadScholarships,   // ()                      → Promise<void>  (call on tab open)
    createScholarship,  // (payload)               → Promise<scholarship | null>
    updateScholarship,  // (scholarshipId, payload)→ Promise<boolean>
    deleteScholarship,  // (scholarshipId)         → Promise<boolean>
  };
}