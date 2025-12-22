import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

export default function SearchBar({ placeholder, onChange, onSmash }) {
  const [searchText, setSearchText] = useState("");
  function handleTextChange(e) {
    const text = e.target.value;
    setSearchText(text);
    onChange(text);
  }
  return (  
    <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#8FB9A8]/30">
      <div className="flex items-center px-5 flex-1">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchText}
          placeholder={placeholder}
          onChange={handleTextChange}
          className="flex-1 pl-3 py-3 text-base outline-none text-gray-800"
        />
      </div>

      <button 
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-[#3F6A8A] hover:to-[#3F6A8A] text-white font-semibold sm:rounded-r-2xl rounded-b-2xl sm:rounded-b-none transition-all duration-300 shadow-md hover:shadow-lg group"
        onClick={onSmash}
      >
        Search
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
