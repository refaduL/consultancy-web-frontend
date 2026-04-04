import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft, Pencil, Eye, Save, X, Plus, Trash2,
  Globe, Mail, Phone, MapPin, Building2, GraduationCap,
  BookOpen, Award, ChevronDown, ExternalLink, Calendar,
  DollarSign, Clock, Users, BadgeCheck
} from "lucide-react";

//  Shared style tokens 
const inputCls =
  "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-base bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition";
const labelCls = "block text-sm font-medium text-slate-500 mb-1.5";
const sectionHeadCls = "text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4";

function Field({ label, children }) {
  return (
    <div>
      <p className={labelCls}>{label}</p>
      {children}
    </div>
  );
}

function ReadValue({ children, className = "" }) {
  return (
    <p className={`text-base text-slate-800 font-medium ${className}`}>
      {children || <span className="text-slate-400 font-normal italic">—</span>}
    </p>
  );
}

function Badge({ children, color = "slate" }) {
  const colors = {
    slate: "bg-slate-100 text-slate-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

// ─── Mock data (replace with API call) ────────────────────────────────────
const MOCK_UNIVERSITY = {
  _id: "u1",
  name: "Technical University of Munich",
  native_name: "Technische Universität München",
  type: "Technical",
  established_year: 1868,
  city: "Munich",
  country: "Germany",
  description: "One of Europe's leading research universities, known for its excellence in engineering and natural sciences.",
  website_url: "https://www.tum.de",
  logo_url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_Technical_University_of_Munich.svg",
  rankings: { qs: 37, times: 30, us_news: 50 },
  contact_info: { email: "admission@tum.de", phone: "+49 89 289 01", address: "Arcisstraße 21, 80333 München" },
  general_application_info: "Winter semester applications usually open in May and close in July.",
  facilities: ["Olympic Park Sports Center", "Entrepreneurship Center", "Research Neutron Source"],
};

const MOCK_PROGRAMS = [
  { _id: "p1", program_name: "MSc Computer Science", degree_level: "Master's", field_of_study: "Computer Science", study_mode: "Full-time", duration: "2 years", tuition_fee: 0, currency: "EUR", language_of_instruction: ["English", "German"], intakes: [{ season: "Winter", year: 2025, deadline: "2025-07-15", status: "open" }], requirements: { ielts: 7.0, gpa: "3.0/4.0" } },
  { _id: "p2", program_name: "BSc Mechanical Engineering", degree_level: "Bachelor's", field_of_study: "Engineering", study_mode: "Full-time", duration: "4 years", tuition_fee: 0, currency: "EUR", language_of_instruction: ["German"], intakes: [{ season: "Fall", year: 2025, deadline: "2025-05-30", status: "closed" }], requirements: { ielts: 6.5 } },
];

const MOCK_COURSES = {
  p1: [
    { _id: "c1", course_name: "Advanced Algorithms", course_code: "IN2310", credits: "6", is_elective: false, semester: 1 },
    { _id: "c2", course_name: "Machine Learning", course_code: "IN2064", credits: "8", is_elective: false, semester: 1 },
    { _id: "c3", course_name: "Distributed Systems", course_code: "IN2259", credits: "6", is_elective: true, semester: 2 },
  ],
  p2: [
    { _id: "c4", course_name: "Engineering Mechanics", course_code: "ME1001", credits: "4", is_elective: false, semester: 1 },
  ],
};

const MOCK_SCHOLARSHIPS = [
  { _id: "s1", scholarship_name: "TUM Merit Scholarship", amount: "€1,200/month", description: "Awarded to outstanding international students.", eligible_nationalities: ["All"], deadline: "2025-06-01", is_active: true },
  { _id: "s2", scholarship_name: "DAAD Study Scholarship", amount: "Full Funding", description: "German Academic Exchange scholarship for graduate students.", eligible_nationalities: ["Bangladesh", "India", "Nigeria"], deadline: "2025-04-15", is_active: true },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function OverviewTab({ data, isEdit, onChange }) {
  return (
    <div className="space-y-6">
      {/* Hero card */}
      <div className="flex flex-col sm:flex-row gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="shrink-0">
          {isEdit ? (
            <div className="space-y-3">
              <img src={data.logo_url || "https://placehold.co/96x96"} alt="logo" className="w-24 h-24 object-contain rounded-xl border border-slate-200 bg-white p-2" />
              <Field label="Logo URL">
                <input className={inputCls} value={data.logo_url} onChange={e => onChange("logo_url", e.target.value)} placeholder="https://..." />
              </Field>
            </div>
          ) : (
            <img src={data.logo_url || "https://placehold.co/96x96"} alt="logo" className="w-24 h-24 object-contain rounded-xl border border-slate-200 bg-white p-2" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {isEdit ? (
            <div className="space-y-4">
              <Field label="University Name *">
                <input className={inputCls} value={data.name} onChange={e => onChange("name", e.target.value)} />
              </Field>
              <Field label="Native Name">
                <input className={inputCls} value={data.native_name} onChange={e => onChange("native_name", e.target.value)} />
              </Field>
            </div>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{data.name}</h1>
              {data.native_name && <p className="text-base text-slate-500 mt-1">{data.native_name}</p>}
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge color="blue">{data.type}</Badge>
                {data.established_year && <Badge color="slate">Est. {data.established_year}</Badge>}
                <Badge color="slate">{data.city}, {data.country}</Badge>
              </div>
              {data.website_url && (
                <a href={data.website_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  <Globe className="w-4 h-4" /> {data.website_url}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </>
          )}
        </div>
      </div>

      {/* Basic details grid */}
      <div>
        <p className={sectionHeadCls}>Basic Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {isEdit ? (
            <>
              <Field label="Type">
                <div className="relative">
                  <select className={inputCls + " appearance-none pr-8"} value={data.type} onChange={e => onChange("type", e.target.value)}>
                    {["Public", "Private", "Technical", "Research", "Liberal Arts", "Other"].map(t => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </Field>
              <Field label="Established Year">
                <input className={inputCls} type="number" value={data.established_year} onChange={e => onChange("established_year", e.target.value)} />
              </Field>
              <Field label="Website URL">
                <input className={inputCls} value={data.website_url} onChange={e => onChange("website_url", e.target.value)} />
              </Field>
            </>
          ) : (
            <>
              <div className="p-5 bg-white border border-slate-200 rounded-xl">
                <p className={labelCls}>Type</p>
                <ReadValue>{data.type}</ReadValue>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-xl">
                <p className={labelCls}>Established</p>
                <ReadValue>{data.established_year}</ReadValue>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-xl">
                <p className={labelCls}>Website</p>
                {data.website_url
                  ? <a href={data.website_url} target="_blank" rel="noreferrer" className="text-base text-indigo-600 font-medium hover:underline truncate block">{data.website_url}</a>
                  : <ReadValue />}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <p className={sectionHeadCls}>Description</p>
        {isEdit ? (
          <textarea className={inputCls + " resize-none"} rows={5} value={data.description} onChange={e => onChange("description", e.target.value)} placeholder="About the university..." />
        ) : (
          <p className="text-base text-slate-700 leading-relaxed">{data.description || <span className="text-slate-400 italic">No description added.</span>}</p>
        )}
      </div>
    </div>
  );
}

function LocationTab({ data, isEdit, onChange }) {
  const setContact = (key, val) => onChange("contact_info", { ...data.contact_info, [key]: val });
  return (
    <div className="space-y-6">
      <div>
        <p className={sectionHeadCls}>Location</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {isEdit ? (
            <>
              <Field label="City *"><input className={inputCls} value={data.city} onChange={e => onChange("city", e.target.value)} /></Field>
              <Field label="Country *"><input className={inputCls} value={data.country} onChange={e => onChange("country", e.target.value)} /></Field>
            </>
          ) : (
            <>
              <div className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-xl">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className={labelCls}>City</p>
                  <ReadValue>{data.city}</ReadValue>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-xl">
                <Building2 className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className={labelCls}>Country</p>
                  <ReadValue>{data.country}</ReadValue>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        <p className={sectionHeadCls}>Contact Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {isEdit ? (
            <>
              <Field label="Email"><input className={inputCls} type="email" value={data.contact_info?.email} onChange={e => setContact("email", e.target.value)} placeholder="admission@..." /></Field>
              <Field label="Phone"><input className={inputCls} value={data.contact_info?.phone} onChange={e => setContact("phone", e.target.value)} placeholder="+1 234 567 890" /></Field>
              <div className="sm:col-span-2">
                <Field label="Address"><input className={inputCls} value={data.contact_info?.address} onChange={e => setContact("address", e.target.value)} placeholder="Street, City, Postal Code" /></Field>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-xl">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className={labelCls}>Email</p>
                  <ReadValue>{data.contact_info?.email}</ReadValue>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-xl">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className={labelCls}>Phone</p>
                  <ReadValue>{data.contact_info?.phone}</ReadValue>
                </div>
              </div>
              <div className="sm:col-span-2 flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-xl">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className={labelCls}>Address</p>
                  <ReadValue>{data.contact_info?.address}</ReadValue>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RankingsFacilitiesTab({ data, isEdit, onChange }) {
  const setRanking = (key, val) => onChange("rankings", { ...data.rankings, [key]: val });
  const addFacility = () => onChange("facilities", [...(data.facilities || []), ""]);
  const removeFacility = (i) => onChange("facilities", data.facilities.filter((_, idx) => idx !== i));
  const updateFacility = (i, val) => onChange("facilities", data.facilities.map((f, idx) => idx === i ? val : f));

  return (
    <div className="space-y-6">
      <div>
        <p className={sectionHeadCls}>World Rankings</p>
        {isEdit ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[["qs", "QS World"], ["times", "Times Higher Ed."], ["us_news", "US News"]].map(([key, label]) => (
              <Field key={key} label={label}>
                <input className={inputCls} type="number" value={data.rankings?.[key] || ""} onChange={e => setRanking(key, e.target.value)} placeholder="e.g. 37" />
              </Field>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[["qs", "QS World"], ["times", "Times Higher Ed."], ["us_news", "US News"]].map(([key, label]) => (
              <div key={key} className="p-5 bg-white border border-slate-200 rounded-xl text-center">
                <p className="text-4xl sm:text-5xl font-bold text-slate-900">
                  {data.rankings?.[key] ? `#${data.rankings[key]}` : <span className="text-slate-300 text-3xl">—</span>}
                </p>
                <p className="text-base text-slate-500 mt-2">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className={sectionHeadCls}>Facilities</p>
        {isEdit ? (
          <div className="space-y-3">
            {(data.facilities || []).map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <input className={inputCls} value={f} onChange={e => updateFacility(i, e.target.value)} placeholder={`Facility ${i + 1}`} />
                <button onClick={() => removeFacility(i)} className="p-2 text-slate-400 hover:text-red-500 transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button onClick={addFacility} className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-1">
              <Plus className="w-4 h-4" /> Add Facility
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {(data.facilities || []).length > 0
              ? data.facilities.map((f, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-base text-slate-700">
                    <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                  </span>
                ))
              : <p className="text-sm text-slate-400 italic">No facilities listed.</p>}
          </div>
        )}
      </div>

      <div>
        <p className={sectionHeadCls}>General Application Info</p>
        {isEdit ? (
          <textarea className={inputCls + " resize-none"} rows={4} value={data.general_application_info} onChange={e => onChange("general_application_info", e.target.value)} placeholder="e.g. Winter semester applications open in May..." />
        ) : (
          <p className="text-base text-slate-700 leading-relaxed">
            {data.general_application_info || <span className="text-slate-400 italic">No application info added.</span>}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Programs Tab ─────────────────────────────────────────────────────────

const EMPTY_PROGRAM = {
  program_name: "", degree_level: "Master's", field_of_study: "", study_mode: "Full-time",
  language_of_instruction: ["English"], description: "", career_prospects: "",
  duration: "", tuition_fee: "", tuition_fee_type: "Per Year", currency: "USD", program_url: "",
  requirements: { gpa: "", ielts: "", toefl: "", gre: "", gmat: "", work_experience_years: 0, other: "" },
  intakes: [],
};

function ProgramForm({ program, onSave, onCancel }) {
  const [form, setForm] = useState(program);
  // Track which intakes existed when the form opened vs newly added
  const [originalIntakeCount] = useState(program.intakes?.length || 0);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setReq = (k, v) => setForm(f => ({ ...f, requirements: { ...f.requirements, [k]: v } }));

  const addIntake = () => setForm(f => ({ ...f, intakes: [...f.intakes, { season: "Fall", year: new Date().getFullYear(), deadline: "", status: "open" }] }));
  const removeIntake = (i) => setForm(f => ({ ...f, intakes: f.intakes.filter((_, idx) => idx !== i) }));
  const setIntake = (i, k, v) => setForm(f => ({ ...f, intakes: f.intakes.map((it, idx) => idx === i ? { ...it, [k]: v } : it) }));

  return (
    <div className="border border-indigo-200 rounded-xl p-5 bg-indigo-50/40 space-y-6">
      <p className="text-base font-semibold text-slate-700">{form._id ? "Edit Program" : "New Program"}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Program Name *"><input className={inputCls} value={form.program_name} onChange={e => set("program_name", e.target.value)} /></Field>
        <Field label="Field of Study *"><input className={inputCls} value={form.field_of_study} onChange={e => set("field_of_study", e.target.value)} /></Field>
        <Field label="Degree Level">
          <select className={inputCls} value={form.degree_level} onChange={e => set("degree_level", e.target.value)}>
            {["Bachelor's", "Master's", "PhD", "Diploma", "Certificate", "Associate"].map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Study Mode">
          <select className={inputCls} value={form.study_mode} onChange={e => set("study_mode", e.target.value)}>
            {["Full-time", "Part-time", "Online", "Hybrid"].map(m => <option key={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Duration"><input className={inputCls} value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="e.g. 2 years" /></Field>
        <Field label="Program URL"><input className={inputCls} value={form.program_url} onChange={e => set("program_url", e.target.value)} placeholder="https://..." /></Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Field label="Tuition Fee"><input className={inputCls} type="number" value={form.tuition_fee} onChange={e => set("tuition_fee", e.target.value)} placeholder="0" /></Field>
        <Field label="Fee Type">
          <select className={inputCls} value={form.tuition_fee_type} onChange={e => set("tuition_fee_type", e.target.value)}>
            {["Per Year", "Per Semester", "Total Program Fee", "Per Credit"].map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Currency"><input className={inputCls} value={form.currency} onChange={e => set("currency", e.target.value)} placeholder="USD" /></Field>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Requirements</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[["gpa", "GPA"], ["ielts", "IELTS"], ["toefl", "TOEFL"], ["gre", "GRE"]].map(([k, l]) => (
            <Field key={k} label={l}><input className={inputCls} value={form.requirements[k]} onChange={e => setReq(k, e.target.value)} placeholder="—" /></Field>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Intakes</p>
          <button onClick={addIntake} className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:text-indigo-700">
            <Plus className="w-4 h-4" /> Add Intake
          </button>
        </div>
        {form.intakes.length === 0 && <p className="text-sm text-slate-400 italic">No intakes added yet.</p>}
        <div className="space-y-3">
          {form.intakes.map((intake, i) => {
            const isNew = i >= originalIntakeCount;
            return (
              <div key={i} className={`grid grid-cols-2 sm:grid-cols-5 gap-3 items-end p-4 rounded-xl border transition-colors ${
                isNew
                  ? "bg-indigo-50/60 border-indigo-200"
                  : "bg-white border-slate-200"
              }`}>
                <Field label="Season">
                  <select className={inputCls} value={intake.season} onChange={e => setIntake(i, "season", e.target.value)}>
                    {["Fall", "Spring", "Summer", "Winter", "Rolling"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Year"><input className={inputCls} type="number" value={intake.year} onChange={e => setIntake(i, "year", e.target.value)} /></Field>
                <Field label="Deadline"><input className={inputCls} type="date" value={intake.deadline} onChange={e => setIntake(i, "deadline", e.target.value)} /></Field>
                <Field label="Status">
                  <select className={inputCls} value={intake.status} onChange={e => setIntake(i, "status", e.target.value)}>
                    {["open", "closed", "waitlist"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <div className="flex items-center justify-between">
                  {isNew && <span className="text-sm font-medium text-indigo-500 whitespace-nowrap">New</span>}
                  <button onClick={() => removeIntake(i)} className="p-2 text-slate-400 hover:text-red-500 ml-auto">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Field label="Description">
        <textarea className={inputCls + " resize-none"} rows={3} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Program overview..." />
      </Field>

      <div className="flex justify-end gap-3 pt-1">
        <button onClick={onCancel} className="px-5 py-2.5 text-base text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
        <button onClick={() => onSave(form)} className="px-5 py-2.5 text-base font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">Save Program</button>
      </div>
    </div>
  );
}

function ProgramsTab({ programs, isEdit, onProgramsChange }) {
  const [editingIdx, setEditingIdx] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (prog) => {
    if (editingIdx !== null) {
      const updated = programs.map((p, i) => i === editingIdx ? prog : p);
      onProgramsChange(updated);
      setEditingIdx(null);
    } else {
      onProgramsChange([...programs, { ...prog, _id: `new_${Date.now()}` }]);
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-5">
      {isEdit && (
        <div className="flex justify-end">
          <button onClick={() => { setShowForm(true); setEditingIdx(null); }}
            className="flex items-center gap-2 px-5 py-2.5 text-base font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
            <Plus className="w-4 h-4" /> Add Program
          </button>
        </div>
      )}

      {isEdit && showForm && editingIdx === null && (
        <ProgramForm program={EMPTY_PROGRAM} onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}

      {programs.length === 0 && (
        <div className="text-center py-10 text-slate-400 text-base italic">No programs added yet.</div>
      )}

      <div className="space-y-4">
        {programs.map((prog, i) => (
          <div key={prog._id}>
            {isEdit && editingIdx === i
              ? <ProgramForm program={prog} onSave={handleSave} onCancel={() => setEditingIdx(null)} />
              : (
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900">{prog.program_name}</h3>
                        <Badge color="indigo">{prog.degree_level}</Badge>
                        <Badge color="slate">{prog.study_mode}</Badge>
                      </div>
                      <p className="text-base text-slate-500">{prog.field_of_study}</p>
                    </div>
                    {isEdit && (
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => { setEditingIdx(i); setShowForm(false); }} className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg">
                          <Pencil className="w-4 h-4 text-indigo-600" />
                        </button>
                        <button onClick={() => onProgramsChange(programs.filter((_, idx) => idx !== i))} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                    <div className="flex items-center gap-2 text-base text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" /> {prog.duration}
                    </div>
                    <div className="flex items-center gap-2 text-base text-slate-600">
                      <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
                      {prog.tuition_fee === 0 ? "Free" : `${prog.currency} ${prog.tuition_fee?.toLocaleString()}`}
                    </div>
                    <div className="flex items-center gap-2 text-base text-slate-600">
                      <Globe className="w-4 h-4 text-slate-400 shrink-0" /> {prog.language_of_instruction?.join(", ")}
                    </div>
                    {prog.requirements?.ielts && (
                      <div className="flex items-center gap-2 text-base text-slate-600">
                        <BookOpen className="w-4 h-4 text-slate-400 shrink-0" /> IELTS {prog.requirements.ielts}+
                      </div>
                    )}
                  </div>

                  {prog.intakes?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                      {prog.intakes.map((intake, j) => (
                        <span key={j} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${
                          intake.status === "open" ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : intake.status === "closed" ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                          <Calendar className="w-3.5 h-3.5" />
                          {intake.season} {intake.year}
                          {intake.deadline && ` · ${new Date(intake.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`}
                          <span className="capitalize">· {intake.status}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Courses Tab ──────────────────────────────────────────────────────────

const EMPTY_COURSE = { course_name: "", course_code: "", description: "", credits: "", is_elective: false, semester: "", prerequisites: "", syllabus_url: "" };

function CoursesTab({ programs, coursesMap, isEdit, onCoursesChange }) {
  const [selectedProgramId, setSelectedProgramId] = useState(programs[0]?._id || "");
  const [showForm, setShowForm] = useState(false);
  const [editingIdx, setEditingIdx] = useState(null);
  const [form, setForm] = useState(EMPTY_COURSE);

  const courses = coursesMap[selectedProgramId] || [];
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    const updated = { ...coursesMap };
    if (editingIdx !== null) {
      updated[selectedProgramId] = courses.map((c, i) => i === editingIdx ? { ...form } : c);
      setEditingIdx(null);
    } else {
      updated[selectedProgramId] = [...courses, { ...form, _id: `new_${Date.now()}` }];
      setShowForm(false);
    }
    onCoursesChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Program selector */}
      <div className="flex items-center gap-4">
        <p className="text-base text-slate-500 shrink-0 font-medium">Program:</p>
        <div className="relative">
          <select className={inputCls + " appearance-none pr-8"} value={selectedProgramId} onChange={e => { setSelectedProgramId(e.target.value); setShowForm(false); setEditingIdx(null); }}>
            {programs.map(p => <option key={p._id} value={p._id}>{p.program_name}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        {isEdit && (
          <button onClick={() => { setShowForm(true); setEditingIdx(null); setForm(EMPTY_COURSE); }}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 text-base font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
            <Plus className="w-4 h-4" /> Add Course
          </button>
        )}
      </div>

      {/* Inline form — highlighted bg for new entry */}
      {isEdit && (showForm || editingIdx !== null) && (
        <div className={`border rounded-xl p-6 space-y-5 ${"bg-indigo-50/40 border-indigo-200"}`}>
          <p className="text-base font-semibold text-slate-700">{editingIdx !== null ? "Edit Course" : "New Course"}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Course Name *"><input className={inputCls} value={form.course_name} onChange={e => setField("course_name", e.target.value)} /></Field>
            <Field label="Course Code"><input className={inputCls} value={form.course_code} onChange={e => setField("course_code", e.target.value)} placeholder="e.g. CS101" /></Field>
            <Field label="Credits"><input className={inputCls} value={form.credits} onChange={e => setField("credits", e.target.value)} placeholder="e.g. 3" /></Field>
            <Field label="Semester"><input className={inputCls} type="number" value={form.semester} onChange={e => setField("semester", e.target.value)} placeholder="e.g. 1" /></Field>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="elective" checked={form.is_elective} onChange={e => setField("is_elective", e.target.checked)} className="w-4 h-4 rounded" />
            <label htmlFor="elective" className="text-base text-slate-700">Elective course</label>
          </div>
          <Field label="Prerequisites"><input className={inputCls} value={form.prerequisites} onChange={e => setField("prerequisites", e.target.value)} placeholder="e.g. Must have completed CS-100" /></Field>
          <div className="flex justify-end gap-3">
            <button onClick={() => { setShowForm(false); setEditingIdx(null); }} className="px-5 py-2.5 text-base text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-5 py-2.5 text-base font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">Save Course</button>
          </div>
        </div>
      )}

      {/* Courses table */}
      {courses.length === 0
        ? <div className="text-center py-10 text-slate-400 text-base italic">No courses for this program yet.</div>
        : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200 text-sm uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">Course</th>
                  <th className="px-4 py-4 text-center font-semibold">Code</th>
                  <th className="px-4 py-4 text-center font-semibold">Credits</th>
                  <th className="px-4 py-4 text-center font-semibold">Semester</th>
                  <th className="px-4 py-4 text-center font-semibold">Type</th>
                  {isEdit && <th className="px-4 py-4 text-center font-semibold">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <tr key={c._id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors text-base">
                    <td className="px-5 py-4 text-slate-800 font-medium">{c.course_name}</td>
                    <td className="px-4 py-4 text-center text-slate-500 font-mono text-sm">{c.course_code || "—"}</td>
                    <td className="px-4 py-4 text-center text-slate-700">{c.credits || "—"}</td>
                    <td className="px-4 py-4 text-center text-slate-700">{c.semester || "—"}</td>
                    <td className="px-4 py-4 text-center">
                      <Badge color={c.is_elective ? "amber" : "blue"}>{c.is_elective ? "Elective" : "Core"}</Badge>
                    </td>
                    {isEdit && (
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <button onClick={() => { setForm(c); setEditingIdx(i); setShowForm(false); }} className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg">
                            <Pencil className="w-4 h-4 text-indigo-600" />
                          </button>
                          <button onClick={() => { const u = { ...coursesMap, [selectedProgramId]: courses.filter((_, idx) => idx !== i) }; onCoursesChange(u); }} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}

// ─── Scholarships Tab ─────────────────────────────────────────────────────

const EMPTY_SCHOLARSHIP = { scholarship_name: "", description: "", amount: "", eligible_nationalities: ["All"], eligibility_criteria: "", deadline: "", is_active: true, scholarship_url: "" };

function ScholarshipsTab({ scholarships, isEdit, onChange }) {
  const [showForm, setShowForm] = useState(false);
  const [editingIdx, setEditingIdx] = useState(null);
  const [form, setForm] = useState(EMPTY_SCHOLARSHIP);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (editingIdx !== null) {
      onChange(scholarships.map((s, i) => i === editingIdx ? { ...form } : s));
      setEditingIdx(null);
    } else {
      onChange([...scholarships, { ...form, _id: `new_${Date.now()}` }]);
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {isEdit && (
        <div className="flex justify-end">
          <button onClick={() => { setShowForm(true); setEditingIdx(null); setForm(EMPTY_SCHOLARSHIP); }}
            className="flex items-center gap-2 px-5 py-2.5 text-base font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
            <Plus className="w-4 h-4" /> Add Scholarship
          </button>
        </div>
      )}

      {/* Form — blue tint for new, neutral for edit */}
      {isEdit && (showForm || editingIdx !== null) && (
        <div className={`border rounded-xl p-6 space-y-5 ${"bg-indigo-50/40 border-indigo-200"}`}>
          <p className="text-base font-semibold text-slate-700">{editingIdx !== null ? "Edit Scholarship" : "New Scholarship"}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Scholarship Name *"><input className={inputCls} value={form.scholarship_name} onChange={e => setField("scholarship_name", e.target.value)} /></Field>
            <Field label="Award Amount *"><input className={inputCls} value={form.amount} onChange={e => setField("amount", e.target.value)} placeholder='e.g. "$5,000" or "Full Tuition"' /></Field>
            <Field label="Deadline"><input className={inputCls} type="date" value={form.deadline} onChange={e => setField("deadline", e.target.value)} /></Field>
            <Field label="Scholarship URL"><input className={inputCls} value={form.scholarship_url} onChange={e => setField("scholarship_url", e.target.value)} placeholder="https://..." /></Field>
          </div>
          <Field label="Description *">
            <textarea className={inputCls + " resize-none"} rows={3} value={form.description} onChange={e => setField("description", e.target.value)} />
          </Field>
          <Field label="Eligibility Criteria">
            <textarea className={inputCls + " resize-none"} rows={3} value={form.eligibility_criteria} onChange={e => setField("eligibility_criteria", e.target.value)} placeholder="e.g. Open to international students with GPA 3.5+" />
          </Field>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="active" checked={form.is_active} onChange={e => setField("is_active", e.target.checked)} className="w-4 h-4 rounded" />
            <label htmlFor="active" className="text-base text-slate-700">Active / Currently accepting</label>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => { setShowForm(false); setEditingIdx(null); }} className="px-5 py-2.5 text-base text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-5 py-2.5 text-base font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">Save Scholarship</button>
          </div>
        </div>
      )}

      {scholarships.length === 0
        ? <div className="text-center py-10 text-slate-400 text-base italic">No scholarships added yet.</div>
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {scholarships.map((s, i) => (
              <div key={s._id} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-base font-semibold text-slate-900">{s.scholarship_name}</h3>
                      <Badge color={s.is_active ? "green" : "slate"}>{s.is_active ? "Active" : "Closed"}</Badge>
                    </div>
                    <p className="text-base text-slate-500 leading-relaxed">{s.description}</p>
                  </div>
                  {isEdit && (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setForm(s); setEditingIdx(i); setShowForm(false); }} className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg">
                        <Pencil className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button onClick={() => onChange(scholarships.filter((_, idx) => idx !== i))} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-base text-slate-600 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-amber-500" /> {s.amount}</span>
                  {s.deadline && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {new Date(s.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>}
                  {s.eligible_nationalities?.length > 0 && <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400" /> {s.eligible_nationalities.join(", ")}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "location", label: "Location & Contact", icon: MapPin },
  { id: "rankings", label: "Rankings & Facilities", icon: Award },
  { id: "programs", label: "Programs", icon: GraduationCap },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "scholarships", label: "Scholarships", icon: Award },
];

export default function UniversityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "edit" ? "edit" : "view";

  const [mode, setMode] = useState(initialMode);
  const [activeTab, setActiveTab] = useState("overview");
  const [university, setUniversity] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState({});
  const [scholarships, setScholarships] = useState([]);
  const [draft, setDraft] = useState(null);
  const [hasUnsaved, setHasUnsaved] = useState(false);

  // Load data
  useEffect(() => {
    // Replace with actual API calls
    setUniversity(MOCK_UNIVERSITY);
    setDraft(MOCK_UNIVERSITY);
    setPrograms(MOCK_PROGRAMS);
    setCourses(MOCK_COURSES);
    setScholarships(MOCK_SCHOLARSHIPS);
  }, [id]);

  const toggleMode = () => {
    const next = mode === "view" ? "edit" : "view";
    setMode(next);
    setSearchParams({ mode: next });
    if (next === "view") {
      setDraft(university); // discard on toggle back
      setHasUnsaved(false);
    }
  };

  const handleFieldChange = (key, value) => {
    setDraft(d => ({ ...d, [key]: value }));
    setHasUnsaved(true);
  };

  const handleSave = () => {
    setUniversity(draft);
    setHasUnsaved(false);
    setMode("view");
    setSearchParams({ mode: "view" });
    // TODO: call API to persist
    console.log("Saving:", draft);
  }; 

  const handleDiscard = () => {
    setDraft(university);
    setHasUnsaved(false);
    setMode("view");
    setSearchParams({ mode: "view" });
  };

  if (!university || !draft) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
      </div>
    );
  }

  const isEdit = mode === "edit";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-6 space-y-6 sm:space-y-8 mt-16 md:mt-20">

        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <button onClick={() => navigate("/admindashboard?tab=universities")}
            className="flex items-center gap-2 text-base text-slate-500 hover:text-slate-800 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Universities
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {hasUnsaved && (
              <span className="hidden sm:inline text-sm text-amber-600 font-medium px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200">
                Unsaved changes
              </span>
            )}

            {isEdit && (
              <>
                <button onClick={handleDiscard}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-base font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                  <X className="w-4 h-4" /> <span className="hidden sm:inline">Discard</span>
                </button>
                <button onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 sm:px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors">
                  <Save className="w-4 h-4" /> Save
                </button>
              </>
            )}

            <button onClick={toggleMode}
              className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 text-sm font-semibold rounded-xl border transition-all ${
                isEdit
                  ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                  : "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
              }`}>
              {isEdit ? <><Eye className="w-4 h-4" /> View</> : <><Pencil className="w-4 h-4" /> Edit</>}
            </button>
          </div>
        </div>

        {/* Page heading */}
        <div className="flex items-center gap-5">
          {university.logo_url && (
            <img src={university.logo_url} alt="logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-xl border border-slate-200 bg-white p-2 shrink-0" />
          )}
          <div className="min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900 truncate">{university.name}</h1>
            <p className="text-base text-slate-500 mt-0.5">{university.city}, {university.country}</p>
          </div>
          {isEdit && (
            <span className="ml-auto shrink-0 px-3 py-1.5 text-sm font-semibold bg-amber-50 text-amber-700 rounded-full border border-amber-200">
              Editing
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const disabled = (tab.id === "courses" || tab.id === "programs" || tab.id === "scholarships") && !university._id;
              return (
                <button
                  key={tab.id}
                  disabled={disabled}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <div className="pb-12">
          {activeTab === "overview" && (
            <OverviewTab data={draft} isEdit={isEdit} onChange={handleFieldChange} />
          )}
          {activeTab === "location" && (
            <LocationTab data={draft} isEdit={isEdit} onChange={handleFieldChange} />
          )}
          {activeTab === "rankings" && (
            <RankingsFacilitiesTab data={draft} isEdit={isEdit} onChange={handleFieldChange} />
          )}
          {activeTab === "programs" && (
            <ProgramsTab programs={programs} isEdit={isEdit} onProgramsChange={setPrograms} />
          )}
          {activeTab === "courses" && (
            <CoursesTab programs={programs} coursesMap={courses} isEdit={isEdit} onCoursesChange={setCourses} />
          )}
          {activeTab === "scholarships" && (
            <ScholarshipsTab scholarships={scholarships} isEdit={isEdit} onChange={setScholarships} />
          )}
        </div>
      </div>
    </div>
  );
}