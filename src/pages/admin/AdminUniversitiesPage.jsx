import { useEffect, useState } from "react";
import UniversitiesTab from "../../components/adminDash/universities/UniversitiesTab";
import { fetchUniversities } from "../../services/universityService";

export default function AdminUniversitiesPage() {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const loadUniversities = async () => {
      const data = await fetchUniversities();
      setUniversities(data.payload.universities);
    };

    loadUniversities();
  }, []);

  return <UniversitiesTab universities={universities} />;
}
