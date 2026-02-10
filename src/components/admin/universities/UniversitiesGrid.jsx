import React from "react";
import UniversityCard from "./UniversityCard";
import { Edit, Trash2, Eye } from "lucide-react";

export default function UniversitiesGrid({ universities, onEdit, onDelete }) {
  
  if (universities.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        No universities available.
      </div>
    );
  }
  
  return (
    <>
      {/* Mobile view — Cards */}
      <div className="grid sm:hidden gap-4">
        {universities.map((uni) => (
          <UniversityCard
            key={uni._id}
            university={uni}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Desktop view — Table */}
      <div className="hidden sm:block bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 text-xs uppercase border-b border-slate-200  tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Country</th>
              <th className="text-left px-4 py-3 font-semibold">Programs</th>
              <th className="text-left px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {universities.map((uni) => (
              <tr
                key={uni._id}
                className="text-sm border-t border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3 text-slate-900 font-medium">
                  {uni.name}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {uni.country}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {uni.programs.length}
                </td>

                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs bg-blue-100 uppercase">
                    {uni.type}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <button className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg">
                      <Eye className="w-4 h-4 text-slate-700" />
                    </button>
                    <button
                      onClick={() => onEdit(uni)}
                      className="p-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button
                      onClick={() => onDelete(uni)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
