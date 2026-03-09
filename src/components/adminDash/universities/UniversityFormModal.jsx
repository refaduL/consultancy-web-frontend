import { ChevronDown, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

const SECTIONS = ["Basic Info", "Location", "Rankings", "Contact", "Extra"];

const inputClass =
  "w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition";

const labelClass = "block text-xs sm:text-sm font-medium text-slate-500 mb-1 sm:mb-1.5";

function Field({ label, children }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export default function UniversityFormModal({ university, onClose, onSave }) {
  const isEditing = !!university;
  const [activeSection, setActiveSection] = useState(0);

  const [form, setForm] = useState({
    name: "",
    native_name: "",
    type: "Public",
    established_year: "",
    city: "",
    country: "",
    description: "",
    website_url: "",
    logo_url: "",
    rankings: { qs: "", times: "", us_news: "" },
    contact_info: { email: "", phone: "", address: "" },
    general_application_info: "",
    facilities: [""],
  });

  useEffect(() => {
    if (university) {
      setForm({
        name: university.name || "",
        native_name: university.native_name || "",
        type: university.type || "Public",
        established_year: university.established_year || "",
        city: university.city || "",
        country: university.country || "",
        description: university.description || "",
        website_url: university.website_url || "",
        logo_url: university.logo_url || "",
        rankings: university.rankings || { qs: "", times: "", us_news: "" },
        contact_info: university.contact_info || { email: "", phone: "", address: "" },
        general_application_info: university.general_application_info || "",
        facilities: university.facilities?.length ? university.facilities : [""],
      });
    }
  }, [university]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const setNested = (group, key, value) =>
    setForm((f) => ({ ...f, [group]: { ...f[group], [key]: value } }));

  const addFacility = () => setForm((f) => ({ ...f, facilities: [...f.facilities, ""] }));
  const removeFacility = (i) =>
    setForm((f) => ({ ...f, facilities: f.facilities.filter((_, idx) => idx !== i) }));
  const updateFacility = (i, val) =>
    setForm((f) => ({
      ...f,
      facilities: f.facilities.map((fac, idx) => (idx === i ? val : fac)),
    }));

  const handleSubmit = () => {
    if (!form.name.trim() || !form.city.trim() || !form.country.trim()) {
      alert("Please fill in all required fields (marked with *).");
      return;
    }
    
    const cleaned = {
      ...form,
      facilities: form.facilities.filter((f) => f.trim() !== ""),
    };
    onSave(cleaned);
  };

  const sectionContent = [
    // 0 — Basic Info
    <div key="basic" className="space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Field label="University Name *">
          <input className={inputClass} placeholder="e.g. Technical University of Munich" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Native Name">
          <input className={inputClass} placeholder="e.g. Technische Universität München" value={form.native_name} onChange={(e) => set("native_name", e.target.value)} />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Field label="Type">
          <div className="relative">
            <select className={inputClass + " appearance-none pr-8"} value={form.type} onChange={(e) => set("type", e.target.value)}>
              {["Public", "Private", "Technical", "Research", "Liberal Arts"].map((t) => (<option key={t}>{t}</option>))}
            </select>
            <ChevronDown className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-400 pointer-events-none" />
          </div>
        </Field>
        <Field label="Established Year">
          <input className={inputClass} placeholder="e.g. 1868" type="number" value={form.established_year} onChange={(e) => set("established_year", e.target.value)} />
        </Field>
      </div>
      <Field label="Description">
        <textarea className={inputClass + " resize-none"} rows={3} placeholder="Brief description of the university..." value={form.description} onChange={(e) => set("description", e.target.value)} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Field label="Website URL">
          <input className={inputClass} placeholder="https://www.example.edu" value={form.website_url} onChange={(e) => set("website_url", e.target.value)} />
        </Field>
        <Field label="Logo URL">
          <input className={inputClass} placeholder="https://..." value={form.logo_url} onChange={(e) => set("logo_url", e.target.value)} />
        </Field>
      </div>
    </div>,

    // 1 — Location
    <div key="location" className="space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Field label="City *">
          <input className={inputClass} placeholder="e.g. Munich" value={form.city} onChange={(e) => set("city", e.target.value)} />
        </Field>
        <Field label="Country *">
          <input className={inputClass} placeholder="e.g. Germany" value={form.country} onChange={(e) => set("country", e.target.value)} />
        </Field>
      </div>
    </div>,

    // 2 — Rankings
    <div key="rankings" className="space-y-4 sm:space-y-5">
      <p className="text-xs sm:text-sm text-slate-400">Leave blank if not ranked.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {[
          { key: "qs", label: "QS World Ranking" },
          { key: "times", label: "Times Higher Education" },
          { key: "us_news", label: "US News Ranking" },
        ].map(({ key, label }) => (
          <Field key={key} label={label}>
            <input className={inputClass} placeholder="e.g. 37" type="number" value={form.rankings[key]} onChange={(e) => setNested("rankings", key, e.target.value)} />
          </Field>
        ))}
      </div>
    </div>,

    // 3 — Contact
    <div key="contact" className="space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Field label="Email">
          <input className={inputClass} placeholder="admission@example.edu" type="email" value={form.contact_info.email} onChange={(e) => setNested("contact_info", "email", e.target.value)} />
        </Field>
        <Field label="Phone">
          <input className={inputClass} placeholder="+49 89 289 01" value={form.contact_info.phone} onChange={(e) => setNested("contact_info", "phone", e.target.value)} />
        </Field>
      </div>
      <Field label="Address">
        <input className={inputClass} placeholder="Street, City, Postal Code" value={form.contact_info.address} onChange={(e) => setNested("contact_info", "address", e.target.value)} />
      </Field>
    </div>,

    // 4 — Extra
    <div key="extra" className="space-y-5 sm:space-y-6">
      <Field label="General Application Info">
        <textarea className={inputClass + " resize-none"} rows={3} placeholder="e.g. Winter semester applications open in May..." value={form.general_application_info} onChange={(e) => set("general_application_info", e.target.value)} />
      </Field>
      <div>
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <label className={labelClass + " mb-0"}>Facilities</label>
          <button type="button" onClick={addFacility} className="flex items-center gap-1 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            Add
          </button>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {form.facilities.map((fac, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className={inputClass} placeholder={`Facility ${i + 1}`} value={fac} onChange={(e) => updateFacility(i, e.target.value)} />
              {form.facilities.length > 1 && (
                <button type="button" onClick={() => removeFacility(i)} className="p-1.5 sm:p-2 text-slate-400 hover:text-red-500 transition-colors shrink-0">
                  <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              {isEditing ? "Edit University" : "Add University"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {activeSection + 1} of {SECTIONS.length} — {SECTIONS[activeSection]}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <X className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        {/* Step tabs */}
        <div className="px-5 sm:px-8 pt-4 sm:pt-5 flex gap-1 sm:gap-1.5 shrink-0">
          {SECTIONS.map((s, i) => (
            <button
              key={s}
              onClick={() => setActiveSection(i)}
              className={`flex-1 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg transition-all ${
                i === activeSection ? "bg-slate-900 text-white" : i < activeSection ? "bg-slate-100 text-slate-500" : "bg-slate-50 text-slate-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="px-5 py-4 sm:px-8 sm:py-6 overflow-y-auto flex-1">
          {sectionContent[activeSection]}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 sm:px-8 sm:py-5 border-t border-slate-100 flex items-center justify-between shrink-0">
          <button
            onClick={() => setActiveSection((s) => Math.max(0, s - 1))}
            disabled={activeSection === 0}
            className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
          >
            Back
          </button>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg sm:rounded-xl transition-colors">
              Cancel
            </button>
            {activeSection < SECTIONS.length - 1 ? (
              <button onClick={() => setActiveSection((s) => s + 1)} className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg sm:rounded-xl transition-colors">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg sm:rounded-xl transition-colors">
                {isEditing ? "Save Changes" : "Add University"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}