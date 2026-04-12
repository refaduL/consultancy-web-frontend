// ViewEnrollmentModal.jsx
import React from "react";
import { X, Calendar, BookOpen, User, Mail, Phone, FileText, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, Award, Send, ChevronRight } from "lucide-react";
import formatDateTime from "../../../helpers/formatDateTime";

export default function ViewEnrollmentModal({ enrollment, onClose }) {
  if (!enrollment) return null;

  const {
    _id,
    user,
    courseId,
    courseName,
    batchName,
    currentScore,
    targetScore,
    notes,
    status,
    createdAt,
    updatedAt
  } = enrollment;

  const getCourseConfig = (courseId) => {
    const map = {
      ielts: { 
        color: "#8FB9A8", 
        bg: "bg-[#8FB9A8]", 
        lightBg: "bg-[#8FB9A8]/10", 
        border: "border-[#8FB9A8]/20",
        label: "IELTS",
        gradient: "from-[#8FB9A8] to-[#6a9b8a]",
        icon: BookOpen
      },
      toefl: { 
        color: "#3F6A8A", 
        bg: "bg-[#3F6A8A]", 
        lightBg: "bg-[#3F6A8A]/10", 
        border: "border-[#3F6A8A]/20",
        label: "TOEFL",
        gradient: "from-[#3F6A8A] to-[#2d4f6a]",
        icon: BookOpen
      },
      pte: { 
        color: "#F1828D", 
        bg: "bg-[#F1828D]", 
        lightBg: "bg-[#F1828D]/10", 
        border: "border-[#F1828D]/20",
        label: "PTE",
        gradient: "from-[#F1828D] to-[#d16a75]",
        icon: BookOpen
      }
    };
    return map[courseId] || { 
      color: "#6B7280", 
      bg: "bg-gray-500", 
      lightBg: "bg-gray-100", 
      border: "border-gray-200", 
      label: courseId?.toUpperCase(), 
      gradient: "from-gray-500 to-gray-600",
      icon: BookOpen
    };
  };

  const courseConfig = getCourseConfig(courseId);
  
  const statusConfig = {
    pending: { 
      icon: Clock, 
      bg: "bg-amber-50", 
      text: "text-amber-700", 
      border: "border-amber-200", 
      label: "Pending Review",
      description: "Awaiting admin confirmation",
      action: "Review Application"
    },
    confirmed: { 
      icon: CheckCircle, 
      bg: "bg-green-50", 
      text: "text-green-700", 
      border: "border-green-200", 
      label: "Confirmed",
      description: "Enrollment has been approved",
      action: "View Details"
    },
    cancelled: { 
      icon: XCircle, 
      bg: "bg-red-50", 
      text: "text-red-700", 
      border: "border-red-200", 
      label: "Cancelled",
      description: "Enrollment request cancelled",
      action: "Reactivate"
    }
  };
  
  const statusInfo = statusConfig[status] || statusConfig.pending;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-in slide-in-from-bottom-4 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Header */}
        <div className={`relative rounded-t-2xl bg-gradient-to-r ${courseConfig.gradient} px-6 py-5 overflow-hidden`}>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <courseConfig.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">{courseName}</h2>
                <p className="text-white/80 text-sm">Enrollment #{_id.slice(-8)}</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-xl text-white/70 hover:bg-white/20 transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Status Banner */}
          <div className={`mt-4 flex items-center gap-3 p-3 rounded-xl ${statusInfo.bg} backdrop-blur-sm border ${statusInfo.border}`}>
            <div className={`w-10 h-10 rounded-full ${statusInfo.bg} flex items-center justify-center`}>
              <StatusIcon className={`w-5 h-5 ${statusInfo.text}`} />
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${statusInfo.text}`}>{statusInfo.label}</p>
              <p className="text-xs text-gray-600">{statusInfo.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Submitted</p>
              <p className="text-sm font-semibold text-gray-700">{formatDateTime(createdAt, "date")}</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Student Profile Card */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">
                  {user?.first_name} {user?.last_name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full ${courseConfig.lightBg} border ${courseConfig.border}`}>
                <p className={`text-xs font-bold`} style={{ color: courseConfig.color }}>{courseConfig.label}</p>
              </div>
            </div>
          </div>

          {/* Course Details - Stacked Vertically */}
          <div className="space-y-3">
            {/* Batch Schedule Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Batch Schedule</p>
              </div>
              <p className="text-sm font-semibold text-gray-800">{batchName}</p>
            </div>
            
            {/* Course ID Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-gray-400" />
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Course ID</p>
              </div>
              <p className="text-sm font-semibold text-gray-800 capitalize">{courseId}</p>
            </div>
          </div>

          {/* Score Tracker */}
          {(currentScore || targetScore) && (
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" />
                Score Progress
              </p>
              <div className="flex items-center gap-4">
                {currentScore && (
                  <div className="flex-1 text-center">
                    <p className="text-xs text-gray-500 mb-1">Current Score</p>
                    <p className="text-2xl font-bold" style={{ color: courseConfig.color }}>{currentScore}</p>
                  </div>
                )}
                {currentScore && targetScore && (
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                )}
                {targetScore && (
                  <div className="flex-1 text-center">
                    <p className="text-xs text-gray-500 mb-1">Target Score</p>
                    <p className="text-2xl font-bold" style={{ color: courseConfig.color }}>{targetScore}</p>
                  </div>
                )}
              </div>
              {currentScore && targetScore && (
                <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((parseFloat(currentScore) / parseFloat(targetScore)) * 100, 100)}%`,
                      background: courseConfig.color 
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Notes Section */}
          {notes && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-700 mb-1">Additional Notes</p>
                  <p className="text-sm text-gray-700">{notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-gray-500">Submitted</p>
              <p className="text-xs font-medium text-gray-700">{formatDateTime(createdAt, "datetime")}</p>
            </div>
            {updatedAt && updatedAt !== createdAt && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <p className="text-xs text-gray-500">Updated</p>
                <p className="text-xs font-medium text-gray-700">{formatDateTime(updatedAt, "datetime")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            Close
          </button>
          {status === 'pending' && (
            <button
              className="flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-all hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${courseConfig.color}, ${courseConfig.color}dd)` }}
            >
              <Send className="w-4 h-4" />
              {statusInfo.action}
            </button>
          )}
          {status === 'confirmed' && (
            <button
              className="flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-all hover:shadow-lg"
              style={{ background: `linear-gradient(135deg, ${courseConfig.color}, ${courseConfig.color}dd)` }}
            >
              View Certificate
            </button>
          )}
          {status === 'cancelled' && (
            <button
              className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl transition-all border-2"
              style={{ borderColor: courseConfig.color, color: courseConfig.color }}
            >
              Request Reactivation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}