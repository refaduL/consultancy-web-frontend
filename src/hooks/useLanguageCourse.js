
import { useState, useEffect, useCallback, useRef } from "react";
import * as languageCourseService  from "../services/enrollmentService";

export default function useLanguageCourse(){
    const [languageCourse,   setLanguageCourse]   = useState(null);
    
    // Page-level fetch state
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    // Secondary lazy-load states (courses / scholarships tabs)
    const [langCourseLoading, setLangCourseLoading]     = useState(false);
    const [langCourseLoaded, setLangCourseLoaded]     = useState(false);

    // Per-action loading & error 
    const [actionLoading, setActionLoading] = useState({});
    const [actionError,   setActionError]   = useState({});


    const loadLangCourses = useCallback(async () => {
    if (langCourseLoaded) return;

    setLangCourseLoading(true);
    try {
        const data = await languageCourseService.fetchLangCourses();
        setPrograms(data.payload.programs ?? []);
        setProgramsLoaded(true);
    } catch (err) {
        setActionError(prev => ({ ...prev, loadPrograms: extractError(err) }));
    } finally {
        setProgramsLoading(false);
    }
    }, [universityId, programsLoaded]);


    return {
        languageCourse,

        loading,
        error,

        langCourseLoading,
        langCourseLoaded,

        actionLoading,
        actionError,

        loadLangCourses,
        createLangCourse,
    }
}