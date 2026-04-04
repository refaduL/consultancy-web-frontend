import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import SortSelect from "../common/SortSelect";
import SearchBar from "../../common/SearchBar";
import FilterDropdown from "../common/FilterDropdown";
import Pagination from "../../common/Pagination";

import UniversitiesGrid from "./UniversitiesGrid";

export default function UniversitiesTab({ universities, onDeleteUniversity }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [countryFilter, setCountryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Country", value: "country" },
    { label: "Programs", value: "programs" },
    { label: "Admission Season", value: "admissionSeason" },
  ];

  const countryOptions = [...new Set(universities.map((uni) => uni.country))];

  const filtered = universities
    .filter((uni) => uni.name.toLowerCase().includes(search.toLowerCase()))
    .filter((uni) => (countryFilter ? uni.country === countryFilter : true))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">All Universities</h2>
          <p className="text-xs text-slate-600 mt-0.5">Manage university profiles and programs</p>
        </div>
        <button
          onClick={() => navigate("/admindashboard/universities/new?mode=edit")}
          className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group"
        >
          <Plus className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Add University
        </button>
      </div>

      <div className="px-2 flex flex-col sm:flex-row item-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SortSelect options={sortOptions} value={sortBy} onChange={setSortBy} />
          <FilterDropdown
            label="Filter by Country"
            options={countryOptions}
            value={countryFilter}
            onChange={setCountryFilter}
          />
        </div>
        <SearchBar placeholder="Search universities..." onChange={setSearch} />
      </div>

      <UniversitiesGrid
        universities={paginated}
        onDelete={onDeleteUniversity}
      />

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