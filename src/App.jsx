import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Universities from "./pages/Universities";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout";
import ConsultationForm from "./pages/FreeConsultation";
import PlaceholderPage from "./components/common/Placeholder";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consultation" element={<ConsultationForm />} />
        <Route path="/page-not-found" element={<PlaceholderPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
