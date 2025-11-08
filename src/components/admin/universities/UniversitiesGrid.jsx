import React from "react";
import UniversityCard from "./UniversityCard";

export default function UniversitiesGrid({ universities, onEdit, onDelete }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {universities.map((uni) => (
        <UniversityCard key={uni.id} university={uni} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}