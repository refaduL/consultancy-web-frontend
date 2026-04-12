import { Route, Routes } from "react-router-dom";

import AdminLayout from "./components/adminDash/layout/AdminLayout";
import PlaceholderPage from "./components/common/Placeholder";
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import AuthUI from "./pages/Authentication";
import ConsultationForm from "./pages/ConsultationForm";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Services from "./pages/Services";
import UniversityAdmissions from "./pages/services/UniversityAdmissionDetail";
import DocumentReviewDetails from "./pages/services/DocumentReviewDetails";
import ScholarshipGuidance from "./pages/services/ScholarshipGuidance";
import VisaAssistance from "./pages/services/VisaAssistanceDetail";
import LanguageTestPrep from "./pages/services/LanguageTestPrep";
import CareerCounseling from "./pages/services/CareerCounseling";
import Universities from "./pages/Universities";
import UniversityDetail from "./pages/UniversityDetail";
import UserDashboard from "./pages/UserDashboard";


import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import AdminUniversitiesPage from "./pages/admin/AdminUniversitiesPage";
import AdminEnrollmentsPage from "./pages/admin/AdminEnrollmentsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import ApplicationReviewPage from "./pages/admin/ApplicationReviewPage";
// import UniversityDetailPage from "./pages/admin/UniDetailPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import CreateUniversityPage from "./pages/admin/CreateUniversityPage";
import UniversityDetailPage from "./pages/admin/AdminUniversityDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/university-admissions" element={<UniversityAdmissions />} />
        <Route path="services/scholarship-guidance" element={<ScholarshipGuidance />} />
        <Route path="services/career-counseling" element={<CareerCounseling />} />
        <Route path="services/visa-assistance" element={<VisaAssistance />} />
        <Route path="services/document-review" element={<DocumentReviewDetails />} />
        <Route path="services/language-test-prep" element={<LanguageTestPrep />} />
        <Route path="universities" element={<Universities />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="consultation" element={<ConsultationForm />} /> */}

        <Route
          path="login"
          element={
            <PublicRoute>
              <AuthUI title="Login Page" />
            </PublicRoute>
          }
        />

        <Route path="*" element={<PlaceholderPage />} />
      </Route>

      <Route path="/universities/:id" element={<UniversityDetail />} />



      {/* <Route
        path="/admindashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "agent"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/admindashboard/universities/:id" 
        element={
          <ProtectedRoute allowedRoles={["admin", "agent"]}>
            <UniversityDetailPage />
          </ProtectedRoute>
        } 
      />
      
      <Route
        path="/admindashboard/applications/:appId"
        element={
          <ProtectedRoute allowedRoles={["admin", "agent"]}>
            <ApplicationReviewPage />
          </ProtectedRoute>
        }
      /> */}

        <Route 
          path="consultation" 
          element={
            <ProtectedRoute allowedRoles={["student"]} >
              <ConsultationForm />
            </ProtectedRoute>
          } 
        />


      <Route
        path="/userdashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "agent"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverviewPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="universities" element={<AdminUniversitiesPage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
        <Route path="enrollments" element={<AdminEnrollmentsPage />} />

        
        <Route path="universities/new" element={<CreateUniversityPage />} />
        <Route path="universities/:id" element={<UniversityDetailPage />} />
        <Route path="universities/:id" element={<UniversityDetailPage />} />

        <Route path="applications/:appId" element={<ApplicationReviewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
