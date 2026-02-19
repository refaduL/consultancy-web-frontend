import { Route, Routes } from "react-router-dom";

import PlaceholderPage from "./components/common/Placeholder";
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import AuthUI from "./pages/Authentication";
import Contact from "./pages/Contact";
import ConsultationForm from "./pages/FreeConsultation";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Universities from "./pages/Universities";
import UniversityDetail from "./pages/UniversityDetail";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="universities" element={<Universities />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="consultation" element={<ConsultationForm />} />

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

      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "agent"]}>
            <AdminDashboard />
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
    </Routes>
  );
}

export default App;
