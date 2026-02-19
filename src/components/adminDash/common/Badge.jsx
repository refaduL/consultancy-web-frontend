import React from "react";
import { CheckCircle, Clock, XCircle, PlayCircle, CheckCheck } from "lucide-react";

export default function Badge({ status, text, variant = "status" }) {
  const getColorStyles = () => {
    if (variant === "season") return "bg-blue-100 text-blue-700";

    switch (status) {
      case "draft": // not yet applied
        return "bg-slate-100 text-slate-700";
      case "submitted": // pending
        return "bg-yellow-100 text-yellow-700";
      case "accepted": // active
        return "bg-blue-100 text-blue-700";
      case "rejected": // rejected
        return "bg-red-100 text-red-700";
      case "approved": // completed
        return "bg-emerald-200 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "submitted":
        return <Clock className="w-3 h-3" />;
      case "accepted":
        return <PlayCircle className="w-3 h-3" />;
      case "rejected":
        return <XCircle className="w-3 h-3" />;
      case "approved": // completed
        return <CheckCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${getColorStyles()}`}
    >
      {getIcon()}
      {text || status}
    </span>
  );
}
