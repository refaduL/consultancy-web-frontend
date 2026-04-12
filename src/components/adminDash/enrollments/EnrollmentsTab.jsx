// EnrollmentsTab.jsx — matching UsersTab layout pattern
import { useState, useMemo } from "react";
import { BookOpen } from "lucide-react";
import SearchBar from "../../common/SearchBar";
import SortSelect from "../common/SortSelect";
import FilterDropdown from "../common/FilterDropdown";
import Pagination from "../../common/Pagination";

import EnrollmentCard from "./EnrollmentsCard";
import EnrollmentsTable from "./EnrollmentsTable";

const SORT_OPTIONS = [
  { label: "Submitted (newest)", value: "newest" },
  { label: "Submitted (oldest)", value: "oldest" },
  { label: "Student name",       value: "name"   },
  { label: "Course",             value: "course" },
];

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled"];
const COURSE_OPTIONS = ["ielts", "toefl", "pte"];

export default function EnrollmentsTab({
  enrollments,
  updatingId,
  onUpdateStatus,
  onView,
  onDelete,
}) {
  const [search,        setSearch]        = useState("");
  const [sortBy,        setSortBy]        = useState("newest");
  const [statusFilter,  setStatusFilter]  = useState("");
  const [courseFilter,  setCourseFilter]  = useState("");
  const [currentPage,   setCurrentPage]   = useState(1);
  const [perPage,       setPerPage]       = useState(10);

  // summary counts
  const counts = useMemo(() => ({
    total:     enrollments.length,
    pending:   enrollments.filter(e => e.status === "pending").length,
    confirmed: enrollments.filter(e => e.status === "confirmed").length,
    cancelled: enrollments.filter(e => e.status === "cancelled").length,
  }), [enrollments]);

  // pipeline: search → filter → sort → paginate 
  const processed = useMemo(() => {
    let list = [...enrollments];

    // search by student name or email
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        `${e.user?.first_name} ${e.user?.last_name}`.toLowerCase().includes(q) ||
        e.user?.email?.toLowerCase().includes(q)
      );
    }

    // status filter
    if (statusFilter) list = list.filter(e => e.status === statusFilter);

    // course filter
    if (courseFilter) list = list.filter(e => e.courseId === courseFilter);

    // sort
    list.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "name")
        return `${a.user?.first_name} ${a.user?.last_name}`
          .localeCompare(`${b.user?.first_name} ${b.user?.last_name}`);
      if (sortBy === "course") return a.courseId.localeCompare(b.courseId);
      return 0;
    });

    return list;
  }, [enrollments, search, statusFilter, courseFilter, sortBy]);

  const totalPages  = Math.ceil(processed.length / perPage);
  const paginated   = processed.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handlePerPageChange = (val) => { setPerPage(val); setCurrentPage(1); };

  // shared props passed down to both card and table views
  const tableProps = { enrollments: paginated, updatingId, onUpdateStatus, onView, onDelete };

  return (
    <div className="space-y-6">

      {/*  Page header */}
      <div className="px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">All Enrollments</h2>
          <p className="text-xs text-slate-600 mt-0.5">Manage language course enrollment applications</p>
        </div>

        {/* export / download placeholder */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">
            {processed.length} result{processed.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Summary stat chips */}
      {/* <div className="px-2 flex flex-wrap gap-3">
        {[
          { label: "Total",     value: counts.total,     bg: "bg-slate-100",        text: "text-slate-700"  },
          { label: "Pending",   value: counts.pending,   bg: "bg-amber-100",        text: "text-amber-700"  },
          { label: "Confirmed", value: counts.confirmed, bg: "bg-green-100",        text: "text-green-700"  },
          { label: "Cancelled", value: counts.cancelled, bg: "bg-red-100",          text: "text-red-700"    },
        ].map((chip) => (
          <div
            key={chip.label}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${chip.bg} ${chip.text}`}
          >
            <span>{chip.label}</span>
            <span className="font-bold">{chip.value}</span>
          </div>
        ))}
      </div> */}

      {/* ── Filter / sort / search bar ───────────────────────────────── */}
      <div className="px-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SortSelect
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={setSortBy}
          />
          <FilterDropdown
            label="Filter by Status"
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
          />
          <FilterDropdown
            label="Filter by Course"
            options={COURSE_OPTIONS}
            value={courseFilter}
            onChange={(v) => { setCourseFilter(v); setCurrentPage(1); }}
          />
        </div>

        <SearchBar
          placeholder="Search by name or email..."
          onChange={(val) => { setSearch(val); setCurrentPage(1); }}
        />
      </div>

      {/* ── Mobile card view ─────────────────────────────────────────── */}
      <div className="md:hidden space-y-3">
        {paginated.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-400">
            No enrollments match your filters.
          </div>
        ) : (
          paginated.map((enrollment) => (
            <EnrollmentCard
              key={enrollment._id}
              enrollment={enrollment}
              updatingId={updatingId}
              onUpdateStatus={onUpdateStatus}
              onView={onView}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      {/* ── Desktop table view ───────────────────────────────────────── */}
      <div className="hidden md:block">
        <EnrollmentsTable {...tableProps} />
      </div>

      {/* ── Pagination ───────────────────────────────────────────────── */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
      />

    </div>
  );
}