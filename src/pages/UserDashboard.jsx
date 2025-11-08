import React, { useState } from "react";
import { FileCheck,
  Upload,
  Heart,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  GraduationCap,
  Bell,
  TrendingUp,
  Award,
  Globe,
  Calendar,
  Download,
  Eye,
  Trash2,
  Menu,
} from "lucide-react";

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "AJ",
    applicationStatus: "approved", // not_started, pending_review, rejected, approved, documents_complete
    submittedDate: "2024-01-15",
    reviewDate: "2024-01-20",
    adminFeedback: "Great profile! Your academic background is impressive. Please upload the required documents to proceed with university applications.",
  };

  const documents = [
    { id: 1, name: "Academic Transcripts", type: "transcript", status: "approved", uploadedDate: "2024-01-22", required: true },
    { id: 2, name: "IELTS Score Report", type: "test_scores", status: "under_review", uploadedDate: "2024-01-23", required: true },
    { id: 3, name: "Personal Statement", type: "essay", status: "not_uploaded", uploadedDate: null, required: true },
    { id: 4, name: "Letters of Recommendation", type: "recommendation", status: "not_uploaded", uploadedDate: null, required: true },
    { id: 5, name: "Passport Copy", type: "passport", status: "approved", uploadedDate: "2024-01-22", required: true },
    { id: 6, name: "Financial Documents", type: "financial", status: "not_uploaded", uploadedDate: null, required: true },
    { id: 7, name: "Resume/CV", type: "resume", status: "not_uploaded", uploadedDate: null, required: true },
    { id: 8, name: "Portfolio (Optional)", type: "portfolio", status: "not_uploaded", uploadedDate: null, required: false },
  ];

  const interestedUniversities = [
    { id: 1, name: "Harvard University", country: "USA", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400", ranking: 1, tuition: 55000, addedDate: "2024-01-10" },
    { id: 2, name: "Stanford University", country: "USA", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400", ranking: 3, tuition: 57000, addedDate: "2024-01-12" },
    { id: 3, name: "MIT", country: "USA", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400", ranking: 2, tuition: 55000, addedDate: "2024-01-14" },
    { id: 4, name: "Oxford University", country: "UK", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400", ranking: 4, tuition: 40000, addedDate: "2024-01-15" },
  ];

  const recentActivity = [
    { id: 1, type: "success", message: "Passport Copy approved", date: "2 hours ago" },
    { id: 2, type: "info", message: "IELTS Score under review", date: "5 hours ago" },
    { id: 3, type: "success", message: "Academic Transcripts approved", date: "1 day ago" },
    { id: 4, type: "info", message: "Application approved by admin", date: "5 days ago" },
  ];

  const documentsUploaded = documents.filter(d => d.status !== "not_uploaded").length;
  const documentsTotal = documents.filter(d => d.required).length;
  const completionPercentage = Math.round((documentsUploaded / documentsTotal) * 100);

  const getDocumentStatusBadge = (status) => {
    const styles = {
      not_uploaded: { bg: "bg-slate-100", text: "text-slate-600", label: "Not Uploaded" },
      uploaded: { bg: "bg-blue-100", text: "text-blue-600", label: "Uploaded" },
      under_review: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Under Review" },
      approved: { bg: "bg-green-100", text: "text-green-700", label: "Approved" },
      rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
    };
    return styles[status] || styles.not_uploaded;
  };

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
                  <p className="text-xs text-slate-600">Welcome back, {user.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-indigo-200">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Application Status Banner - APPROVED */}
        {user.applicationStatus === "approved" && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-200">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Congratulations! You're Approved</h2>
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold w-fit">
                    Approved
                  </span>
                </div>
                <div className="bg-white rounded-xl p-4 mb-4 border border-green-200">
                  <p className="text-sm font-semibold text-slate-900 mb-2">Admin's Message:</p>
                  <p className="text-sm text-slate-700">{user.adminFeedback}</p>
                  <p className="text-xs text-slate-500 mt-2">Reviewed on {user.reviewDate}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Documents
                  </button>
                  <button className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <Globe className="w-4 h-4" />
                    Browse Universities
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Status</span>
            </div>
            <div className="text-lg font-bold text-green-600">Approved</div>
            <p className="text-xs text-slate-600 mt-1">Application</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Documents</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">{documentsUploaded}/{documentsTotal}</div>
            <p className="text-xs text-slate-600 mt-1">Uploaded</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Progress</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">{completionPercentage}%</div>
            <p className="text-xs text-slate-600 mt-1">Complete</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Interested</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">{interestedUniversities.length}</div>
            <p className="text-xs text-slate-600 mt-1">Universities</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Documents */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Document Upload Section */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Required Documents</h2>
                  <p className="text-sm text-slate-600">Upload all required documents to complete your profile</p>
                </div>
              </div>

              {/* Progress Bar */}
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

              {/* Document Grid */}
              <div className="space-y-3">
                {documents.filter(d => d.required).map((doc) => {
                  const statusBadge = getDocumentStatusBadge(doc.status);
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all group"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          doc.status === "approved" ? "bg-green-100" :
                          doc.status === "under_review" ? "bg-yellow-100" :
                          doc.status === "rejected" ? "bg-red-100" :
                          "bg-slate-200"
                        }`}>
                          {doc.status === "approved" ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : doc.status === "under_review" ? (
                            <Clock className="w-6 h-6 text-yellow-600" />
                          ) : doc.status === "rejected" ? (
                            <XCircle className="w-6 h-6 text-red-600" />
                          ) : (
                            <FileText className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 truncate">{doc.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                              {statusBadge.label}
                            </span>
                            {doc.uploadedDate && (
                              <span className="text-xs text-slate-500">• {doc.uploadedDate}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {doc.status === "not_uploaded" ? (
                          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            <span className="hidden sm:inline">Upload</span>
                          </button>
                        ) : (
                          <>
                            <button className="p-2 hover:bg-white rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-slate-600" />
                            </button>
                            {doc.status !== "approved" && (
                              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                <Upload className="w-4 h-4 text-slate-600" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            


          </div>

          {/* Right Column - Activity & Profile */}
          <div className="space-y-6">
            

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      activity.type === "success" ? "bg-green-500" : "bg-blue-500"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">{activity.message}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Documents
                </button>
                <button className="w-full px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Browse Universities
                </button>
                <button className="w-full px-4 py-2.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  My Interested List
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Interested Universities */}
            <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">My Interested Universities</h2>
                  <p className="text-sm text-slate-600">Universities you're interested in applying to</p>
                </div>
                <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium transition-colors">
                  Browse More
                </button>
              </div>

              <div className="grid sm:grid-cols-4 gap-4">
                {interestedUniversities.map((uni) => (
                  <div
                    key={uni.id}
                    className="group relative bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={uni.image}
                        alt={uni.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 mb-1 truncate">{uni.name}</h3>
                      <p className="text-sm text-slate-600 mb-3 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        {uni.country}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">QS Rank: <span className="font-bold text-slate-900">#{uni.ranking}</span></span>
                        <span className="text-slate-600">Tuition: <span className="font-bold text-slate-900">${(uni.tuition/1000).toFixed(0)}K</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
      </div>
    </div>
  );
}