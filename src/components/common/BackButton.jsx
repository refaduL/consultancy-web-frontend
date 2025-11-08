import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function BackButton({ text = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        group 
        inline-flex items-center gap-2 
        cursor-pointer rounded-lg 
        border border-gray-200 
        bg-gray-50 
        px-3 py-2
        text-sm font-medium text-gray-700 
        shadow-sm 
        transition-all duration-200 ease-in-out
        hover:bg-gray-100 
        hover:border-gray-300
        hover:text-gray-900
        active:scale-95 
      "
    >
      <ArrowLeft className="h-5 w-5 transition-all duration-200 ease-in-out group-hover:-translate-x-0.5" />
      <span>{text}</span>
    </button>
  );
}
