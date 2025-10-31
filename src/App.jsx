import { Route, Routes } from "react-router-dom";

import PlaceholderPage from "./components/common/Placeholder";
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ConsultationForm from "./pages/FreeConsultation";
import Home from "./pages/Home";
import Services from "./pages/Services";
import UniversityDetail from "./pages/UniversityDetail";
import UniversitiesList from "./pages/UniversityList";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/universities" element={<UniversitiesList />} />
        <Route path="/universities/:id" element={<UniversityDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consultation" element={<ConsultationForm />} />
        <Route path="/page-not-found" element={<PlaceholderPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
