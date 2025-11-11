import React, { useState } from "react";
import {
  FileCheck, Upload, Heart, CheckCircle, Clock, XCircle, FileText, GraduationCap, Bell, TrendingUp, Award, Globe, Calendar, Eye
} from "lucide-react";
import NotificationOverlay from "../components/user/NotificationOverlay";

// Reusable Components
const StatCard = ({ icon, title, value, subtitle, color }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 ${color.bg} rounded-lg flex items-center justify-center`}>
        {React.cloneElement(icon, { className: `${color.icon} w-5 h-5` })}
      </div>
      <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">{title}</span>
    </div>
    <div className={`text-2xl md:text-3xl font-bold ${color.text}`}>{value}</div>
    <p className="text-xs text-slate-600 mt-1">{subtitle}</p>
  </div>
);

const DocumentItem = ({ doc }) => {
  const statusStyles = {
    not_uploaded: { bg: "bg-slate-100", text: "text-slate-600", label: "Not Uploaded", icon: <FileText /> },
    uploaded: { bg: "bg-blue-100", text: "text-blue-600", label: "Uploaded", icon: <Upload /> },
    under_review: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Under Review", icon: <Clock /> },
    approved: { bg: "bg-green-100", text: "text-green-700", label: "Approved", icon: <CheckCircle /> },
    rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected", icon: <XCircle /> },
  };
  const style = statusStyles[doc.status] || statusStyles.not_uploaded;

  return (
    <div className="flex flex-col gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${style.bg}`}>
            {React.cloneElement(style.icon, { className: `${style.text} w-6 h-6` })}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{doc.name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {/* Status label */}
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text} truncate`}>
                {style.label}
              </span>
              {/* Uploaded date */}
              {doc.uploadedDate && (
                <span className="text-xs text-slate-500 truncate">
                  • {doc.uploadedDate}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Upload / Eye button */}
        <div className="flex items-center gap-2 ml-4">
          {doc.status === "not_uploaded" ? (
            <button className="p-2 sm:px-4 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span> {/* Hidden on mobile */}
            </button>
          ) : (
            <button className="p-2 hover:bg-white rounded-lg transition-colors">
              <Eye className="w-4 h-4 text-slate-600" />
            </button>
          )}
        </div>
      </div>

      {/* Admin Feedback */}
      {(doc.status === "approved" || doc.status === "rejected") && doc.adminFeedback && (
        <div className={`mt-2 p-3 rounded-lg border-l-4 ${doc.status === "approved" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
          <p className="text-sm text-slate-900">{doc.adminFeedback}</p>
        </div>
      )}
    </div>
  );
};

const ActivityItem = ({ activity }) => (
  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activity.type === "success" ? "bg-green-500" : "bg-blue-500"}`}></div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-slate-900">{activity.message}</p>
      <p className="text-xs text-slate-500 mt-0.5">{activity.date}</p>
    </div>
  </div>
);

const UniversityCard = ({ uni }) => (
  <div className="group relative bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all">
    <div className="aspect-video relative overflow-hidden">
      <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
      </button>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-slate-900 mb-1 truncate">{uni.name}</h3>
      <p className="text-sm text-slate-600 mb-3 flex items-center gap-1">
        <Globe className="w-3.5 h-3.5" /> {uni.country}
      </p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600">QS Rank: <span className="font-bold text-slate-900">#{uni.ranking}</span></span>
        <span className="text-slate-600">Tuition: <span className="font-bold text-slate-900">${(uni.tuition/1000).toFixed(0)}K</span></span>
      </div>
    </div>
  </div>
);

export default function UserDashboard() {

  const [showNotification, setShowNotification] = useState(false);

  const [documents, setDocuments] = useState([
    { id: 1, name: "Academic Transcripts", type: "transcript", status: "approved", uploadedDate: "2024-01-22", required: true },
    { id: 2, name: "IELTS Score Report", type: "test_scores", status: "under_review", uploadedDate: "2024-01-23", required: true },
    { id: 3, name: "Personal Statement", type: "essay", status: "not_uploaded", uploadedDate: null, required: true },
    { id: 4, name: "Letters of Recommendation", type: "recommendation", status: "rejected", uploadedDate: "2024-01-25", required: true, adminFeedback: "Please provide updated letters from your professors." },
    { id: 5, name: "Passport Copy", type: "passport", status: "uploaded", uploadedDate: "2024-01-22", required: true },
    { id: 6, name: "Financial Documents", type: "financial", status: "not_uploaded", uploadedDate: null, required: true },
    { id: 7, name: "Resume/CV", type: "resume", status: "approved", uploadedDate: "2024-01-26", required: true },
    { id: 8, name: "Portfolio (Optional)", type: "portfolio", status: "under_review", uploadedDate: "2024-01-27", required: false },
    { id: 9, name: "Motivation Letter", type: "essay", status: "not_uploaded", uploadedDate: null, required: true },
    { id: 10, name: "Extra Certificates", type: "certificates", status: "rejected", uploadedDate: "2024-01-28", required: false },
  ]);

  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "AJ",
    applicationStatus: "approved", // approved, rejected, pending_review
    submittedDate: "2024-01-15",
    reviewDate: "2024-01-20",
    adminFeedback: "Great profile! Your academic background is impressive. Please upload the required documents to proceed with university applications.",
  };

  const recentActivity = [
    { id: 1, type: "success", message: "Passport Copy approved", date: "2 hours ago" },
    { id: 2, type: "info", message: "IELTS Score under review", date: "5 hours ago" },
    { id: 3, type: "success", message: "Academic Transcripts approved", date: "1 day ago" },
    { id: 4, type: "info", message: "Application approved by admin", date: "5 days ago" },
  ];

  const interestedUniversities = [
    { id: 1, name: "Harvard University", country: "USA", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400", ranking: 1, tuition: 55000 },
    { id: 2, name: "Stanford University", country: "USA", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400", ranking: 3, tuition: 57000 },
    { id: 3, name: "MIT", country: "USA", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400", ranking: 2, tuition: 55000 },
    { id: 4, name: "Oxford University", country: "UK", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400", ranking: 4, tuition: 40000 },
  ];

  const documentsUploaded = documents.filter(d => d.status !== "not_uploaded").length;
  const documentsTotal = documents.length;
  const documentsRequired = documents.filter(d => d.required).length;
  const completionPercentage = Math.round((documentsUploaded / documentsTotal) * 100);

  return (

<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
  {/* Top Navigation */}
  <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900">My Dashboard</h1>
              <p className="text-xs text-slate-600 truncate">Welcome back, {user.name}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setShowNotification(true)} >
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-indigo-200 truncate">
            {user.avatar}
          </div>
        </div>
      </div>
    </div>
  </nav>

  {/* Notification Overlay */}
  {showNotification && <NotificationOverlay user={user} onClose={() => setShowNotification(false)} />}

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon={<Award />}
        title="Status"
        value="Approved"
        subtitle="Application"
        color={{ bg: "bg-green-100", text: "text-green-600", icon: "text-green-600" }}
      />
      <StatCard
        icon={<FileCheck />}
        title="Documents"
        value={`${documentsUploaded}/${documentsTotal}`}
        subtitle="Uploaded"
        color={{ bg: "bg-indigo-100", text: "text-indigo-600", icon: "text-indigo-600" }}
      />
      <StatCard
        icon={<TrendingUp />}
        title="Progress"
        value={`${completionPercentage}%`}
        subtitle="Complete"
        color={{ bg: "bg-purple-100", text: "text-slate-900", icon: "text-purple-600" }}
      />
      <StatCard
        icon={<Heart />}
        title="Interested"
        value={interestedUniversities.length}
        subtitle="Universities"
        color={{ bg: "bg-pink-100", text: "text-slate-900", icon: "text-pink-600" }}
      />
    </div>

    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left - Documents */}
      <div className="flex-1 space-y-8">
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Required Documents</h2>
              <p className="text-sm text-slate-600">Upload all required documents to complete your profile</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
              <span className="text-sm font-bold text-indigo-600">{completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            {documents.filter(d => d.required).map(doc => (
              <DocumentItem key={doc.id} doc={doc} />
            ))}
          </div>
        </section>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Documents
            </button>
            <button className="w-full px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" /> Browse Universities
            </button>
            <button className="w-full px-4 py-2.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg text-sm font-medium flex items-center gap-2">
              <Heart className="w-4 h-4" /> My Interested List
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Interested Universities */}
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">My Interested Universities</h2>
          <p className="text-sm text-slate-600">Universities you're interested in applying to</p>
        </div>
        <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium whitespace-nowrap">
          Browse More
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {interestedUniversities.map(uni => <UniversityCard key={uni.id} uni={uni} />)}
      </div>
    </section>
  </div>
</div>

  );
}
