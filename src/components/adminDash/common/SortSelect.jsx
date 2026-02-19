import React from "react";
import { ChevronDown } from "lucide-react";

export default function SortSelect({ options, value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border border-slate-300 text-sm rounded-lg px-3 py-2 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort by {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />

    </div>
  );
}
