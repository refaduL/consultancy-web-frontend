import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Edit2, Trash2, Plus, Save, X, Globe, MapPin, Calendar,
  Award, BookOpen, GraduationCap, DollarSign, Building2, ExternalLink,
  AlertTriangle, Loader2, Mail, Phone, Clock, Languages, Target,
  FileText, Link2, Users, ChevronRight, ChevronDown,
} from "lucide-react";
import { useUniversity } from "../../hooks/useUniversity";


// ─── Utility ─────────────────────────────────────────────────────────
const cx = (...a) => a.filter(Boolean).join(" ");

const DEGREE_META = {
  "Bachelor's": { pill: "bg-sky-100 text-sky-700",      bar: "bg-sky-400"      },
  "Master's":   { pill: "bg-violet-100 text-violet-700", bar: "bg-violet-400"  },
  "PhD":        { pill: "bg-amber-100 text-amber-700",   bar: "bg-amber-400"   },
  "Diploma":    { pill: "bg-emerald-100 text-emerald-700",bar: "bg-emerald-400" },
  "Certificate":{ pill: "bg-rose-100 text-rose-700",     bar: "bg-rose-400"    },
  "Associate":  { pill: "bg-slate-100 text-slate-600",   bar: "bg-slate-300"   },
};

const INTAKE_STATUS = {
  open:     "bg-emerald-100 text-emerald-700",
  closed:   "bg-red-100 text-red-600",
  waitlist: "bg-amber-100 text-amber-700",
};

// ─── Design tokens ────────────────────────────────────────────────────
const I        = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100";
const TA       = I + " resize-none";
const SEL      = I + " cursor-pointer";
const BTN      = "inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition disabled:opacity-50";
const BTN_GHOST= "inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50";
const BTN_DANGER="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50";
const LBL      = "block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1";

// ─── Atoms ────────────────────────────────────────────────────────────
function Tag({ children, cls: c = "bg-slate-100 text-slate-600" }) {
  return <span className={cx("inline-block rounded-lg px-2.5 py-0.5 text-xs font-semibold", c)}>{children}</span>;
}

function Pill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
      {label}
      {onRemove && (
        <button onClick={onRemove} className="ml-0.5 hover:bg-slate-200 rounded-full p-0.5">
          <X className="w-2.5 h-2.5" />
        </button>
      )}
    </span>
  );
}

function FF({ label, required, error, children }) {
  return (
    <div>
      <label className={LBL}>{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const SHD = ({ label }) => (
  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 mb-3 mt-1">{label}</p>
);

// ─── Modal shell ──────────────────────────────────────────────────────
function Modal({ title, sub, wide, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm px-4 py-10">
      <div className={cx("w-full rounded-2xl bg-white shadow-2xl my-auto", wide ? "max-w-3xl" : "max-w-lg")}>
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">{title}</h2>
            {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100 transition">
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function ConfirmModal({ message, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-red-100 p-2.5 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Confirm Delete</p>
            <p className="text-xs text-slate-400 mt-0.5">This cannot be undone</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 mb-6 pl-11">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} disabled={loading} className={BTN_GHOST}>Cancel</button>
          <button onClick={onConfirm} disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// UNIVERSITY EDIT MODAL
// Props: u (university object), onSave(payload), onClose(), saving (bool)
// ═══════════════════════════════════════════════════════════════════════
function UniEditModal({ u, onSave, onClose, saving }) {
  const [f, setF] = useState({
    name:                    u.name                    ?? "",
    native_name:             u.native_name             ?? "",
    type:                    u.type                    ?? "Public",
    established_year:        u.established_year        ?? "",
    city:                    u.city                    ?? "",
    country:                 u.country                 ?? "",
    description:             u.description             ?? "",
    website_url:             u.website_url             ?? "",
    logo_url:                u.logo_url                ?? "",
    general_application_info:u.general_application_info?? "",
    rankings:    { qs: u.rankings?.qs ?? "", times: u.rankings?.times ?? "", us_news: u.rankings?.us_news ?? "" },
    contact_info:{ email: u.contact_info?.email ?? "", phone: u.contact_info?.phone ?? "", address: u.contact_info?.address ?? "" },
    facilities:  [...(u.facilities ?? [])],
  });
  const [facInput, setFacInput] = useState("");
  const [err, setErr]           = useState({});

  const set  = (k, v)       => setF(p => ({ ...p, [k]: v }));
  const setN = (p2, k, v)   => setF(p => ({ ...p, [p2]: { ...p[p2], [k]: v } }));

  const addFac = () => {
    const v = facInput.trim();
    if (v && !f.facilities.includes(v)) { set("facilities", [...f.facilities, v]); setFacInput(""); }
  };

  const validate = () => {
    const e = {};
    if (!f.name.trim())    e.name    = "Required";
    if (!f.city.trim())    e.city    = "Required";
    if (!f.country.trim()) e.country = "Required";
    setErr(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    onSave({
      ...f,
      established_year: f.established_year ? Number(f.established_year) : undefined,
      rankings: {
        qs:      f.rankings.qs      ? Number(f.rankings.qs)      : null,
        times:   f.rankings.times   ? Number(f.rankings.times)   : null,
        us_news: f.rankings.us_news ? Number(f.rankings.us_news) : null,
      },
    });
  };

  return (
    <Modal title="Edit University" sub="Update all fields and save" wide onClose={onClose}>
      <div className="space-y-5 max-h-[68vh] overflow-y-auto pr-1">
        <SHD label="Basic Info" />
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <FF label="University Name" required error={err.name}>
              <input className={I} value={f.name} onChange={e => set("name", e.target.value)} />
            </FF>
          </div>
          <FF label="Native / Local Name">
            <input className={I} value={f.native_name} onChange={e => set("native_name", e.target.value)} placeholder="e.g. Technische Universität München" />
          </FF>
          <FF label="Type">
            <select className={SEL} value={f.type} onChange={e => set("type", e.target.value)}>
              {["Public","Private","Technical","Research","Liberal Arts","Other"].map(t => <option key={t}>{t}</option>)}
            </select>
          </FF>
          <FF label="Established Year">
            <input type="number" className={I} value={f.established_year} onChange={e => set("established_year", e.target.value)} placeholder="e.g. 1861" />
          </FF>
          <FF label="City" required error={err.city}>
            <input className={I} value={f.city} onChange={e => set("city", e.target.value)} />
          </FF>
          <FF label="Country" required error={err.country}>
            <input className={I} value={f.country} onChange={e => set("country", e.target.value)} />
          </FF>
          <FF label="Website URL">
            <input className={I} value={f.website_url} onChange={e => set("website_url", e.target.value)} placeholder="https://" />
          </FF>
          <FF label="Logo URL">
            <input className={I} value={f.logo_url} onChange={e => set("logo_url", e.target.value)} placeholder="https://" />
          </FF>
        </div>

        <SHD label="Description" />
        <FF label="Description">
          <textarea rows={3} className={TA} value={f.description} onChange={e => set("description", e.target.value)} />
        </FF>
        <FF label="General Application Info">
          <textarea rows={2} className={TA} value={f.general_application_info} onChange={e => set("general_application_info", e.target.value)} />
        </FF>

        <SHD label="Rankings" />
        <div className="grid grid-cols-3 gap-4">
          <FF label="QS World">
            <input type="number" className={I} value={f.rankings.qs} onChange={e => setN("rankings","qs",e.target.value)} placeholder="—" />
          </FF>
          <FF label="Times Higher">
            <input type="number" className={I} value={f.rankings.times} onChange={e => setN("rankings","times",e.target.value)} placeholder="—" />
          </FF>
          <FF label="US News">
            <input type="number" className={I} value={f.rankings.us_news} onChange={e => setN("rankings","us_news",e.target.value)} placeholder="—" />
          </FF>
        </div>

        <SHD label="Contact Info" />
        <div className="grid grid-cols-2 gap-4">
          <FF label="Email">
            <input className={I} value={f.contact_info.email} onChange={e => setN("contact_info","email",e.target.value)} />
          </FF>
          <FF label="Phone">
            <input className={I} value={f.contact_info.phone} onChange={e => setN("contact_info","phone",e.target.value)} />
          </FF>
          <div className="col-span-2">
            <FF label="Address">
              <input className={I} value={f.contact_info.address} onChange={e => setN("contact_info","address",e.target.value)} />
            </FF>
          </div>
        </div>

        <SHD label="Facilities" />
        <div className="flex gap-2 mb-2">
          <input className={I} placeholder="Add facility…" value={facInput}
            onChange={e => setFacInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addFac())} />
          <button onClick={addFac} className="flex-shrink-0 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {f.facilities.map((fc, i) => (
            <Pill key={i} label={fc} onRemove={() => set("facilities", f.facilities.filter((_,j) => j !== i))} />
          ))}
          {!f.facilities.length && <p className="text-xs text-slate-400 italic">No facilities added.</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-100">
        <button onClick={onClose} className={BTN_GHOST}>Cancel</button>
        <button onClick={submit} disabled={saving} className={BTN}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Changes
        </button>
      </div>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PROGRAM FORM MODAL
// Props: initial (program obj or undefined for new), onSave(payload), onClose(), saving
// ═══════════════════════════════════════════════════════════════════════
const EP = {
  program_name: "", degree_level: "Master's", field_of_study: "", study_mode: "Full-time",
  language_of_instruction: ["English"], description: "", career_prospects: "",
  duration: "", tuition_fee: "", tuition_fee_type: "Per Year", currency: "USD", program_url: "",
  requirements: { gpa: "", ielts: "", toefl: "", gre: "", gmat: "", work_experience_years: "", other: "" },
  intakes: [],
};

function ProgramModal({ initial, onSave, onClose, saving }) {
  const isEdit = !!initial?._id;
  const [f, setF]     = useState({ ...EP, ...(initial ?? {}), requirements: { ...EP.requirements, ...(initial?.requirements ?? {}) } });
  const [langIn, setLangIn] = useState("");
  const [err, setErr]       = useState({});

  const set    = (k, v) => setF(p => ({ ...p, [k]: v }));
  const setR   = (k, v) => setF(p => ({ ...p, requirements: { ...p.requirements, [k]: v } }));

  const addLang = () => {
    const v = langIn.trim();
    if (v && !f.language_of_instruction.includes(v)) {
      set("language_of_instruction", [...f.language_of_instruction, v]);
      setLangIn("");
    }
  };

  const addIntake   = () => set("intakes", [...f.intakes, { season: "Fall", year: new Date().getFullYear() + 1, deadline: "", start_date: "", status: "open" }]);
  const updIntake   = (i, k, v) => set("intakes", f.intakes.map((x, j) => j === i ? { ...x, [k]: v } : x));

  const validate = () => {
    const e = {};
    if (!f.program_name.trim())  e.name  = "Required";
    if (!f.field_of_study.trim())e.field = "Required";
    if (!f.duration.trim())      e.dur   = "Required";
    setErr(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    onSave({ ...f, tuition_fee: f.tuition_fee ? Number(f.tuition_fee) : undefined });
  };

  return (
    <Modal title={isEdit ? "Edit Program" : "Add Program"} sub="Fill in program details" wide onClose={onClose}>
      <div className="space-y-5 max-h-[68vh] overflow-y-auto pr-1">
        <SHD label="Program Details" />
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <FF label="Program Name" required error={err.name}>
              <input className={I} value={f.program_name} onChange={e => set("program_name", e.target.value)} placeholder="e.g. MSc Computer Science" />
            </FF>
          </div>
          <FF label="Degree Level">
            <select className={SEL} value={f.degree_level} onChange={e => set("degree_level", e.target.value)}>
              {["Bachelor's","Master's","PhD","Diploma","Certificate","Associate"].map(d => <option key={d}>{d}</option>)}
            </select>
          </FF>
          <FF label="Field of Study" required error={err.field}>
            <input className={I} value={f.field_of_study} onChange={e => set("field_of_study", e.target.value)} placeholder="e.g. Computer Science" />
          </FF>
          <FF label="Study Mode">
            <select className={SEL} value={f.study_mode} onChange={e => set("study_mode", e.target.value)}>
              {["Full-time","Part-time","Online","Hybrid"].map(m => <option key={m}>{m}</option>)}
            </select>
          </FF>
          <FF label="Duration" required error={err.dur}>
            <input className={I} value={f.duration} onChange={e => set("duration", e.target.value)} placeholder="e.g. 2 years" />
          </FF>
          <FF label="Program URL">
            <input className={I} value={f.program_url} onChange={e => set("program_url", e.target.value)} placeholder="https://" />
          </FF>
        </div>

        <SHD label="Language of Instruction" />
        <div className="flex gap-2 mb-2">
          <input className={I} placeholder="Add language…" value={langIn}
            onChange={e => setLangIn(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addLang())} />
          <button onClick={addLang} className="flex-shrink-0 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {f.language_of_instruction.map((l, i) => (
            <Pill key={i} label={l} onRemove={() => set("language_of_instruction", f.language_of_instruction.filter((_,j) => j !== i))} />
          ))}
        </div>

        <SHD label="Tuition" />
        <div className="grid grid-cols-3 gap-4">
          <FF label="Tuition Fee">
            <input type="number" className={I} value={f.tuition_fee} onChange={e => set("tuition_fee", e.target.value)} />
          </FF>
          <FF label="Currency">
            <input className={I} value={f.currency} onChange={e => set("currency", e.target.value)} placeholder="USD" />
          </FF>
          <FF label="Fee Type">
            <select className={SEL} value={f.tuition_fee_type} onChange={e => set("tuition_fee_type", e.target.value)}>
              {["Per Year","Per Semester","Total Program Fee","Per Credit"].map(t => <option key={t}>{t}</option>)}
            </select>
          </FF>
        </div>

        <SHD label="Admission Requirements" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            ["gpa",                  "Min GPA",          "text"],
            ["ielts",                "Min IELTS",         "number"],
            ["toefl",                "Min TOEFL",         "number"],
            ["gre",                  "Min GRE",           "number"],
            ["gmat",                 "Min GMAT",          "number"],
            ["work_experience_years","Work Exp (yrs)",    "number"],
          ].map(([k, lbl, tp]) => (
            <FF key={k} label={lbl}>
              <input type={tp} className={I} value={f.requirements[k] ?? ""} onChange={e => setR(k, e.target.value)} />
            </FF>
          ))}
          <div className="col-span-2 sm:col-span-3">
            <FF label="Other Requirements">
              <input className={I} value={f.requirements.other ?? ""} onChange={e => setR("other", e.target.value)} placeholder="Any additional requirements…" />
            </FF>
          </div>
        </div>

        <SHD label="Description & Career" />
        <FF label="Program Description">
          <textarea rows={3} className={TA} value={f.description} onChange={e => set("description", e.target.value)} />
        </FF>
        <FF label="Career Prospects">
          <textarea rows={2} className={TA} value={f.career_prospects} onChange={e => set("career_prospects", e.target.value)} placeholder="Graduates often work at…" />
        </FF>

        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mt-1">
          <SHD label="Intakes" />
          <button onClick={addIntake} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mb-2">
            <Plus className="h-3 w-3" /> Add Intake
          </button>
        </div>
        {f.intakes.length === 0
          ? <p className="text-xs text-slate-400 italic">No intakes added.</p>
          : f.intakes.map((intake, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <FF label="Season">
                  <select className={SEL} value={intake.season} onChange={e => updIntake(i,"season",e.target.value)}>
                    {["Fall","Spring","Summer","Winter","Rolling"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </FF>
                <FF label="Year">
                  <input type="number" className={I} value={intake.year} onChange={e => updIntake(i,"year",e.target.value)} />
                </FF>
                <FF label="Deadline">
                  <input type="date" className={I} value={intake.deadline?.slice?.(0,10) ?? ""} onChange={e => updIntake(i,"deadline",e.target.value)} />
                </FF>
                <FF label="Status">
                  <select className={SEL} value={intake.status} onChange={e => updIntake(i,"status",e.target.value)}>
                    {["open","closed","waitlist"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </FF>
              </div>
              <button onClick={() => set("intakes", f.intakes.filter((_,j) => j !== i))} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                <X className="h-3 w-3" /> Remove
              </button>
            </div>
          ))
        }
      </div>

      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-100">
        <button onClick={onClose} className={BTN_GHOST}>Cancel</button>
        <button onClick={submit} disabled={saving} className={BTN}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isEdit ? "Save Changes" : "Create Program"}
        </button>
      </div>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// COURSE FORM MODAL
// Props: initial (course obj or undefined), programName, onSave(payload), onClose(), saving
// ═══════════════════════════════════════════════════════════════════════
const EC = { course_name: "", course_code: "", description: "", credits: "", is_elective: false, semester: "", prerequisites: "", syllabus_url: "" };

function CourseModal({ initial, programName, onSave, onClose, saving }) {
  const isEdit = !!initial?._id;
  const [f, setF] = useState({ ...EC, ...(initial ?? {}) });
  const [err, setErr] = useState({});
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const submit = () => {
    if (!f.course_name.trim()) { setErr({ name: "Required" }); return; }
    onSave(f);
  };

  return (
    <Modal title={isEdit ? "Edit Course" : "Add Course"} sub={programName ? `Under: ${programName}` : undefined} onClose={onClose}>
      <div className="space-y-4">
        <FF label="Course Name" required error={err.name}>
          <input className={I} value={f.course_name} onChange={e => set("course_name", e.target.value)} placeholder="e.g. Introduction to Machine Learning" />
        </FF>
        <div className="grid grid-cols-2 gap-4">
          <FF label="Course Code">
            <input className={I} value={f.course_code} onChange={e => set("course_code", e.target.value)} placeholder="e.g. CS-401" />
          </FF>
          <FF label="Credits">
            <input className={I} value={f.credits} onChange={e => set("credits", e.target.value)} placeholder="e.g. 3 or 3-4" />
          </FF>
          <FF label="Semester">
            <input type="number" min="1" className={I} value={f.semester} onChange={e => set("semester", e.target.value)} placeholder="e.g. 1" />
          </FF>
          <FF label="Type">
            <div className="flex gap-2 mt-0.5">
              {[["Core Course", false], ["Elective", true]].map(([label, val]) => (
                <button key={label} type="button" onClick={() => set("is_elective", val)}
                  className={cx("flex-1 rounded-xl border py-2.5 text-xs font-semibold transition",
                    f.is_elective === val
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50")}>
                  {label}
                </button>
              ))}
            </div>
          </FF>
        </div>
        <FF label="Description">
          <textarea rows={2} className={TA} value={f.description} onChange={e => set("description", e.target.value)} />
        </FF>
        <FF label="Prerequisites">
          <input className={I} value={f.prerequisites} onChange={e => set("prerequisites", e.target.value)} placeholder="e.g. Must have completed CS-100" />
        </FF>
        <FF label="Syllabus URL">
          <input className={I} value={f.syllabus_url} onChange={e => set("syllabus_url", e.target.value)} placeholder="https://…" />
        </FF>
      </div>

      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-100">
        <button onClick={onClose} className={BTN_GHOST}>Cancel</button>
        <button onClick={submit} disabled={saving} className={BTN}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isEdit ? "Save Changes" : "Add Course"}
        </button>
      </div>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCHOLARSHIP FORM MODAL
// Props: initial, programs[], onSave(payload), onClose(), saving
// ═══════════════════════════════════════════════════════════════════════
const ES = { scholarship_name: "", amount: "", description: "", eligibility_criteria: "", eligible_nationalities: ["All"], deadline: "", is_active: true, scholarship_url: "", program: null };

function ScholarshipModal({ initial, programs, onSave, onClose, saving }) {
  const isEdit = !!initial?._id;
  const [f, setF] = useState({ ...ES, ...(initial ?? {}) });
  const [natIn, setNatIn] = useState("");
  const [err, setErr]     = useState({});
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const addNat = () => {
    const v = natIn.trim();
    if (v) { set("eligible_nationalities", [...f.eligible_nationalities.filter(x => x !== "All"), v]); setNatIn(""); }
  };

  const validate = () => {
    const e = {};
    if (!f.scholarship_name.trim()) e.name   = "Required";
    if (!f.amount.trim())           e.amount = "Required";
    if (!f.description.trim())      e.desc   = "Required";
    setErr(e);
    return !Object.keys(e).length;
  };

  return (
    <Modal title={isEdit ? "Edit Scholarship" : "Add Scholarship"} onClose={onClose}>
      <div className="space-y-4 max-h-[68vh] overflow-y-auto pr-1">
        <FF label="Scholarship Name" required error={err.name}>
          <input className={I} value={f.scholarship_name} onChange={e => set("scholarship_name", e.target.value)} />
        </FF>
        <div className="grid grid-cols-2 gap-4">
          <FF label="Award Amount" required error={err.amount}>
            <input className={I} value={f.amount} onChange={e => set("amount", e.target.value)} placeholder="e.g. Full Tuition / $5,000" />
          </FF>
          <FF label="Deadline">
            <input type="date" className={I} value={f.deadline ? String(f.deadline).slice(0,10) : ""} onChange={e => set("deadline", e.target.value)} />
          </FF>
        </div>
        <FF label="Description" required error={err.desc}>
          <textarea rows={3} className={TA} value={f.description} onChange={e => set("description", e.target.value)} />
        </FF>
        <FF label="Eligibility Criteria">
          <textarea rows={2} className={TA} value={f.eligibility_criteria} onChange={e => set("eligibility_criteria", e.target.value)} placeholder="GPA 3.5+, developing countries…" />
        </FF>
        <FF label="Eligible Nationalities">
          <div className="flex gap-2 mb-2">
            <input className={I} placeholder="e.g. Bangladesh" value={natIn}
              onChange={e => setNatIn(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addNat())} />
            <button onClick={addNat} className="flex-shrink-0 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {f.eligible_nationalities.map((n, i) => (
              <Pill key={i} label={n} onRemove={n !== "All" ? () => set("eligible_nationalities", f.eligible_nationalities.filter(x => x !== n)) : undefined} />
            ))}
          </div>
        </FF>
        <div className="grid grid-cols-2 gap-4">
          <FF label="Scholarship URL">
            <input className={I} value={f.scholarship_url} onChange={e => set("scholarship_url", e.target.value)} placeholder="https://" />
          </FF>
          <FF label="Linked Program (optional)">
            <select className={SEL} value={f.program ?? ""} onChange={e => set("program", e.target.value || null)}>
              <option value="">University-wide</option>
              {programs.map(p => <option key={p._id} value={p._id}>{p.program_name}</option>)}
            </select>
          </FF>
        </div>
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 cursor-pointer">
          <input type="checkbox" checked={f.is_active} onChange={e => set("is_active", e.target.checked)} className="h-4 w-4 accent-slate-900" />
          <span className="text-sm font-medium text-slate-700">Scholarship is currently active</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-100">
        <button onClick={onClose} className={BTN_GHOST}>Cancel</button>
        <button onClick={() => validate() && onSave(f)} disabled={saving} className={BTN}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isEdit ? "Save Changes" : "Add Scholarship"}
        </button>
      </div>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PROGRAM CARD  — receives hook actions as props
// Props: program, courseMap, actionLoading, actionError,
//        onEdit(program), onDelete(program),
//        onLoadCourses(programId), onSaveCourse(programId, courseId|null, payload),
//        onDeleteCourse(programId, courseId)
// ═══════════════════════════════════════════════════════════════════════
function ProgramCard({ program, courseMap, actionLoading, onEdit, onDelete, onLoadCourses, onSaveCourse, onDeleteCourse }) {
  const [open,          setOpen]          = useState(false);
  const [courseModal,   setCourseModal]   = useState(null); // null | "add" | courseObj
  const [confirmDelC,   setConfirmDelC]   = useState(null); // null | courseObj

  const dm      = DEGREE_META[program.degree_level] ?? DEGREE_META["Associate"];
  const courses = courseMap[program._id] ?? null;         // null = not yet loaded
  const list    = courses ?? [];
  const core    = list.filter(c => !c.is_elective);
  const elec    = list.filter(c => c.is_elective);

  // Loading keys from the hook
  const loadKey   = `loadCourses_${program._id}`;
  const createKey = `createCourse_${program._id}`;

  const isLoadingCourses = !!actionLoading[loadKey];

  const toggle = () => {
    if (!open && courses === null) onLoadCourses(program._id);
    setOpen(p => !p);
  };

  // courseModal is "add" → create, otherwise it's an existing course obj → update
  const handleSaveCourse = async (payload) => {
    const courseId = courseModal?._id ?? null; // null means create
    const ok = await onSaveCourse(program._id, courseId, payload);
    if (ok !== false) setCourseModal(null);
  };

  const handleDeleteCourse = async () => {
    const ok = await onDeleteCourse(program._id, confirmDelC._id);
    if (ok !== false) setConfirmDelC(null);
  };

  // Determine saving state for the course modal
  const isSavingCourse = courseModal?._id
    ? !!actionLoading[`updateCourse_${courseModal._id}`]
    : !!actionLoading[createKey];

  const isDeletingCourse = !!actionLoading[`deleteCourse_${confirmDelC?._id}`];

  return (
    <>
      {courseModal !== null && (
        <CourseModal
          initial={courseModal === "add" ? undefined : courseModal}
          programName={program.program_name}
          onSave={handleSaveCourse}
          onClose={() => setCourseModal(null)}
          saving={isSavingCourse}
        />
      )}
      {confirmDelC && (
        <ConfirmModal
          message={`Delete course "${confirmDelC.course_name}"?`}
          onConfirm={handleDeleteCourse}
          onCancel={() => setConfirmDelC(null)}
          loading={isDeletingCourse}
        />
      )}

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        {/* ─ Program header row ─ */}
        <div className="flex items-start gap-0">
          <div className={cx("w-1 flex-shrink-0 self-stretch", dm.bar)} />

          <div className="flex flex-1 items-start gap-4 p-5 min-w-0">
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={cx("rounded-lg px-2.5 py-0.5 text-xs font-bold", dm.pill)}>{program.degree_level}</span>
                <Tag cls="bg-slate-100 text-slate-600">{program.study_mode}</Tag>
                {program.language_of_instruction?.slice(0,2).map(l => (
                  <Tag key={l} cls="bg-slate-100 text-slate-500">{l}</Tag>
                ))}
              </div>
              <h3 className="font-bold text-slate-900 text-[15px] leading-snug">{program.program_name}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{program.field_of_study}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                {program.duration && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{program.duration}</span>}
                {program.tuition_fee && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {program.currency} {Number(program.tuition_fee).toLocaleString()} · {program.tuition_fee_type}
                  </span>
                )}
                {program.requirements?.ielts && <span className="flex items-center gap-1"><Languages className="h-3 w-3" />IELTS {program.requirements.ielts}+</span>}
                {program.requirements?.gpa   && <span className="flex items-center gap-1"><Target className="h-3 w-3" />GPA {program.requirements.gpa}</span>}
              </div>
              {program.intakes?.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {program.intakes.map((it, i) => (
                    <span key={i} className={cx("rounded-md px-2 py-0.5 text-[11px] font-semibold", INTAKE_STATUS[it.status] ?? "bg-slate-100 text-slate-600")}>
                      {it.season} {it.year}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-shrink-0 items-center gap-1.5 mt-0.5">
              <button onClick={toggle}
                className={cx("inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition",
                  open ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50")}>
                <BookOpen className="h-3.5 w-3.5" />
                Courses
                {courses !== null && (
                  <span className={cx("rounded-full px-1.5 py-0.5 text-[10px] font-bold", open ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500")}>
                    {courses.length}
                  </span>
                )}
                {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>
              <button onClick={() => onEdit(program)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 transition">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => onDelete(program)} className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50 transition">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ─ Courses panel ─ */}
        {open && (
          <div className="border-t border-slate-100 bg-slate-50/70">
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Courses {courses !== null && `· ${courses.length}`}
              </p>
              <button onClick={() => setCourseModal("add")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition">
                <Plus className="h-3.5 w-3.5" /> Add Course
              </button>
            </div>

            <div className="p-4">
              {isLoadingCourses ? (
                <div className="flex items-center justify-center gap-2 py-10 text-slate-400">
                  <Loader2 className="h-5 w-5 animate-spin" /><span className="text-sm">Loading courses…</span>
                </div>
              ) : list.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <BookOpen className="h-9 w-9 text-slate-200 mb-2" />
                  <p className="text-sm font-medium text-slate-500">No courses yet</p>
                  <p className="text-xs text-slate-400 mt-0.5 mb-3">Add core and elective courses to this program.</p>
                  <button onClick={() => setCourseModal("add")} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Plus className="h-3 w-3" /> Add first course
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {core.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Core Courses</p>
                      <div className="space-y-1.5">
                        {core.map(c => (
                          <CourseRow key={c._id} course={c}
                            onEdit={() => setCourseModal(c)}
                            onDelete={() => setConfirmDelC(c)} />
                        ))}
                      </div>
                    </div>
                  )}
                  {elec.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Electives</p>
                      <div className="space-y-1.5">
                        {elec.map(c => (
                          <CourseRow key={c._id} course={c}
                            onEdit={() => setCourseModal(c)}
                            onDelete={() => setConfirmDelC(c)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function CourseRow({ course, onEdit, onDelete }) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-slate-300 transition">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">{course.course_name}</span>
          {course.course_code && <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">{course.course_code}</code>}
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-0.5 text-[11px] text-slate-400">
          {course.semester    && <span>Sem {course.semester}</span>}
          {course.credits     && <span>{course.credits} cr</span>}
          {course.prerequisites && <span className="truncate max-w-[180px]">Prereq: {course.prerequisites}</span>}
          {course.syllabus_url && (
            <a href={course.syllabus_url} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 text-blue-500 hover:underline">
              <FileText className="h-2.5 w-2.5" /> Syllabus
            </a>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
        <button onClick={onEdit}   className="rounded-lg p-1.5 hover:bg-slate-100 transition"><Edit2 className="h-3.5 w-3.5 text-slate-500" /></button>
        <button onClick={onDelete} className="rounded-lg p-1.5 hover:bg-red-50 transition"><Trash2 className="h-3.5 w-3.5 text-red-500" /></button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCHOLARSHIP CARD
// ═══════════════════════════════════════════════════════════════════════
function ScholarshipCard({ scholarship, programs, onEdit, onDelete }) {
  const linked = programs.find(p => p._id === scholarship.program);
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-sm transition-shadow">
      <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mt-0.5">
        <Award className="h-5 w-5 text-amber-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-bold text-slate-900">{scholarship.scholarship_name}</span>
          <Tag cls={scholarship.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}>
            {scholarship.is_active ? "Active" : "Inactive"}
          </Tag>
          {linked  && <Tag cls="bg-violet-100 text-violet-700">{linked.program_name}</Tag>}
          {!linked && <Tag cls="bg-slate-100 text-slate-500">University-wide</Tag>}
        </div>
        <p className="text-sm font-semibold text-amber-600 mb-1.5">{scholarship.amount}</p>
        <p className="text-sm text-slate-500 line-clamp-2">{scholarship.description}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
          {scholarship.deadline && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Deadline: {new Date(scholarship.deadline).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}
            </span>
          )}
          {scholarship.eligible_nationalities?.length > 0 && (
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{scholarship.eligible_nationalities.join(", ")}</span>
          )}
          {scholarship.scholarship_url && (
            <a href={scholarship.scholarship_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline">
              <Link2 className="h-3 w-3" />Details
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-shrink-0 gap-1.5">
        <button onClick={() => onEdit(scholarship)}   className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 transition h-fit"><Edit2 className="h-4 w-4" /></button>
        <button onClick={() => onDelete(scholarship)} className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50 transition h-fit"><Trash2 className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════
export default function AdminUniversityDetails() {
  const { id }   = useParams();
  const navigate = useNavigate();

  // ── All data + mutations come from the hook ──────────────────────────
  const {
    university,
    programs,
    scholarships,
    courseMap,
    loading,
    error,
    programsLoading,
    programsLoaded,
    scholarshipsLoading,
    scholarshipsLoaded,
    actionLoading,
    actionError,
    updateUniversity,
    deleteUniversity,
    loadPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
    fetchCoursesForProgram,
    createCourse,
    updateCourse,
    deleteCourse,
    loadScholarships,
    createScholarship,
    updateScholarship,
    deleteScholarship,
  } = useUniversity(id);

  // ── Local UI-only state (modals, confirm dialogs) ────────────────────
  const [tab,        setTab]        = useState("overview");
  const [editOpen,   setEditOpen]   = useState(false);
  const [progModal,  setProgModal]  = useState(null); // null | "add" | programObj
  const [scholModal, setScholModal] = useState(null); // null | "add" | scholarshipObj
  const [confirmDel, setConfirmDel] = useState(null); // null | { label, fn }
  const [deleting,   setDeleting]   = useState(false);

  // ── Tab switch: trigger lazy loads ──────────────────────────────────
  const handleTabChange = (key) => {
    setTab(key);
    if (key === "programs"     && !programsLoaded)     loadPrograms();
    if (key === "scholarships" && !scholarshipsLoaded) loadScholarships();
  };

  // ── University ───────────────────────────────────────────────────────
  const handleSaveUni = async (payload) => {
    const ok = await updateUniversity(payload);
    if (ok) setEditOpen(false);
  };

  const openDelUni = () => setConfirmDel({
    label: university?.name,
    fn: async () => {
      const ok = await deleteUniversity();
      if (ok) navigate("/admindashboard?tab=universities");
    },
  });

  // ── Programs ─────────────────────────────────────────────────────────
  const handleSaveProg = async (payload) => {
    if (progModal?._id) {
      // Edit: only pass changed fields; university stays the same
      const ok = await updateProgram(progModal._id, payload);
      if (ok) setProgModal(null);
    } else {
      // Create
      const created = await createProgram(payload);
      if (created) setProgModal(null);
    }
  };

  const openDelProg = (prog) => setConfirmDel({
    label: prog.program_name,
    fn: async () => {
      await deleteProgram(prog._id);
      setConfirmDel(null);
    },
  });

  // ── Courses (bridge: ProgramCard calls this, we delegate to hook) ────
  // Returns false on error so ProgramCard can keep its modal open.
  const handleSaveCourse = useCallback(async (programId, courseId, payload) => {
    if (courseId) {
      return await updateCourse(programId, courseId, payload);
    } else {
      const created = await createCourse(programId, payload);
      return created !== null;
    }
  }, [createCourse, updateCourse]);

  const handleDeleteCourse = useCallback(async (programId, courseId) => {
    return await deleteCourse(programId, courseId);
  }, [deleteCourse]);

  // ── Scholarships ──────────────────────────────────────────────────────
  const handleSaveSchol = async (payload) => {
    if (scholModal?._id) {
      const ok = await updateScholarship(scholModal._id, payload);
      if (ok) setScholModal(null);
    } else {
      const created = await createScholarship(payload);
      if (created) setScholModal(null);
    }
  };

  const openDelSchol = (s) => setConfirmDel({
    label: s.scholarship_name,
    fn: async () => {
      await deleteScholarship(s._id);
      setConfirmDel(null);
    },
  });

  // ── Generic confirm-delete execution ─────────────────────────────────
  const execConfirmDel = async () => {
    setDeleting(true);
    try { await confirmDel.fn(); }
    finally { setDeleting(false); }
  };

  // ── Render guards ─────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#f8f9fb]">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm font-medium">Loading university…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex h-screen items-center justify-center bg-[#f8f9fb]">
      <div className="flex flex-col items-center gap-3 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <p className="text-sm font-medium">{error}</p>
        <button onClick={() => navigate("/admindashboard?tab=universities")} className={BTN}>
          <ArrowLeft className="h-4 w-4" /> Back to Universities
        </button>
      </div>
    </div>
  );

  const u = university;
  if (!u) return null;

  const TABS = [
    { key: "overview",     label: "Overview",     Icon: Building2    },
    { key: "programs",     label: "Programs",     Icon: GraduationCap, count: programsLoaded     ? programs.length     : null },
    { key: "scholarships", label: "Scholarships", Icon: Award,          count: scholarshipsLoaded ? scholarships.length : null },
  ];

  // Derived loading/saving states from actionLoading
  const isSavingUni   = !!actionLoading["updateUniversity"];
  const isSavingProg  = progModal?._id
    ? !!actionLoading[`updateProgram_${progModal._id}`]
    : !!actionLoading["createProgram"];
  const isSavingSchol = scholModal?._id
    ? !!actionLoading[`updateScholarship_${scholModal._id}`]
    : !!actionLoading["createScholarship"];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* ── Modals ─────────────────────────────────────────────────── */}
      {editOpen && (
        <UniEditModal u={u} onSave={handleSaveUni} onClose={() => setEditOpen(false)} saving={isSavingUni} />
      )}
      {progModal !== null && (
        <ProgramModal
          initial={progModal === "add" ? undefined : progModal}
          onSave={handleSaveProg}
          onClose={() => setProgModal(null)}
          saving={isSavingProg}
        />
      )}
      {scholModal !== null && (
        <ScholarshipModal
          initial={scholModal === "add" ? undefined : scholModal}
          programs={programs}
          onSave={handleSaveSchol}
          onClose={() => setScholModal(null)}
          saving={isSavingSchol}
        />
      )}
      {confirmDel && (
        <ConfirmModal
          message={`Delete "${confirmDel.label}"?`}
          onConfirm={execConfirmDel}
          onCancel={() => setConfirmDel(null)}
          loading={deleting}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">

        {/* Back */}
        <button onClick={() => navigate("/admindashboard?tab=universities")}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Universities
        </button>

        {/* ══ HEADER CARD ══════════════════════════════════════════════ */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-5">
          <div className="h-1.5 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400" />

          <div className="p-7 md:p-8">
            {/* Logo + name + actions */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="flex-shrink-0 h-[72px] w-[72px] rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                {u.logo_url && !u.logo_url.includes("placehold.co")
                  ? <img src={u.logo_url} alt={u.name} className="h-full w-full object-cover" />
                  : <div className="h-full w-full flex items-center justify-center"><Building2 className="h-8 w-8 text-slate-300" /></div>
                }
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Tag cls="bg-slate-100 text-slate-700">{u.type}</Tag>
                  {u.established_year && <Tag cls="bg-slate-100 text-slate-500">Est. {u.established_year}</Tag>}
                </div>
                <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-tight">{u.name}</h1>
                {u.native_name && <p className="text-sm text-slate-400 mt-0.5 italic">{u.native_name}</p>}
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" />{u.city}, {u.country}</span>
                  {u.website_url && (
                    <a href={u.website_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                      <Globe className="h-3.5 w-3.5" />{u.website_url.replace(/^https?:\/\//,"")} <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setEditOpen(true)} className={BTN} disabled={isSavingUni}>
                  {isSavingUni ? <Loader2 className="h-4 w-4 animate-spin" /> : <Edit2 className="h-4 w-4" />} Edit University
                </button>
                <button onClick={openDelUni} className={BTN_DANGER} style={{padding:"10px 12px"}}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            {u.description && (
              <p className="mt-5 pt-5 border-t border-slate-100 text-sm text-slate-600 leading-relaxed max-w-3xl">{u.description}</p>
            )}

            {/* Rankings + contact */}
            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { lbl: "QS World Ranking", val: u.rankings?.qs,      color: "text-violet-600" },
                { lbl: "Times Higher Ed",  val: u.rankings?.times,   color: "text-blue-600"   },
                { lbl: "US News",          val: u.rankings?.us_news, color: "text-emerald-600"},
              ].map(({ lbl, val, color }) => (
                <div key={lbl} className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4 text-center">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">{lbl}</p>
                  <p className={cx("text-2xl font-extrabold", val ? color : "text-slate-200")}>{val ? `#${val}` : "—"}</p>
                </div>
              ))}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Contact</p>
                {u.contact_info?.email && (
                  <a href={`mailto:${u.contact_info.email}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600 transition mb-1.5 truncate">
                    <Mail className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />{u.contact_info.email}
                  </a>
                )}
                {u.contact_info?.phone && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Phone className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />{u.contact_info.phone}
                  </div>
                )}
                {!u.contact_info?.email && !u.contact_info?.phone && <p className="text-xs text-slate-400 italic">No contact.</p>}
              </div>
            </div>

            {/* Facilities */}
            {u.facilities?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {u.facilities.map((f, i) => (
                  <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{f}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ══ TABS ═══════════════════════════════════════════════════ */}
        <div className="flex gap-1 mb-5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          {TABS.map(t => (
            <button key={t.key} onClick={() => handleTabChange(t.key)}
              className={cx("flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                tab === t.key ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}>
              <t.Icon className="h-4 w-4" />
              {t.label}
              {t.count != null && (
                <span className={cx("rounded-full px-1.5 py-0.5 text-[10px] font-bold", tab === t.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500")}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══ OVERVIEW ═══════════════════════════════════════════════ */}
        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
              {u.general_application_info && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">General Application Info</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{u.general_application_info}</p>
                </div>
              )}
              {u.contact_info?.address && (
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Campus Address</p>
                  <div className="flex items-start gap-2 text-sm text-slate-700">
                    <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />{u.contact_info.address}
                  </div>
                </div>
              )}
              {!u.general_application_info && !u.contact_info?.address && (
                <p className="text-sm text-slate-400 italic">No additional info. Click Edit University to add details.</p>
              )}
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Quick Facts</p>
                {[
                  [Building2, "Type",        u.type],
                  [Calendar,  "Established", u.established_year?.toString()],
                  [MapPin,    "Location",    u.city && u.country ? `${u.city}, ${u.country}` : null],
                  [Globe,     "Website",     u.website_url],
                  [Mail,      "Email",       u.contact_info?.email],
                  [Phone,     "Phone",       u.contact_info?.phone],
                ].filter(([,,v]) => v).map(([Icon, label, val], i) => (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
                    <Icon className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 leading-none mb-0.5">{label}</p>
                      {label === "Website"
                        ? <a href={val} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">{val}</a>
                        : <p className="text-sm text-slate-800">{val}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ PROGRAMS ═══════════════════════════════════════════════ */}
        {tab === "programs" && (
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Programs</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage degree programs · expand to view & edit courses</p>
              </div>
              <button onClick={() => setProgModal("add")} className={BTN}>
                <Plus className="h-4 w-4" /> Add Program
              </button>
            </div>

            {programsLoading ? (
              <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
                <Loader2 className="h-6 w-6 animate-spin" /><span className="text-sm">Loading…</span>
              </div>
            ) : programs.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 py-20 text-center bg-white">
                <GraduationCap className="h-12 w-12 text-slate-200 mb-3" />
                <p className="font-bold text-slate-700">No programs yet</p>
                <p className="text-sm text-slate-400 mt-1 mb-5">Start by adding the first degree program.</p>
                <button onClick={() => setProgModal("add")} className={BTN}><Plus className="h-4 w-4" /> Add Program</button>
              </div>
            ) : (
              <div className="space-y-3">
                {programs.map(p => (
                  <ProgramCard
                    key={p._id}
                    program={p}
                    courseMap={courseMap}
                    actionLoading={actionLoading}
                    onEdit={prog => setProgModal(prog)}
                    onDelete={openDelProg}
                    onLoadCourses={fetchCoursesForProgram}
                    onSaveCourse={handleSaveCourse}
                    onDeleteCourse={handleDeleteCourse}
                  />
                ))}
              </div>
            )}

            {/* Global action error for program create */}
            {actionError["createProgram"] && (
              <p className="text-xs text-red-500 text-center">{actionError["createProgram"]}</p>
            )}
          </div>
        )}

        {/* ══ SCHOLARSHIPS ═══════════════════════════════════════════ */}
        {tab === "scholarships" && (
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Scholarships</h2>
                <p className="text-xs text-slate-500 mt-0.5">University-wide and program-specific financial aid</p>
              </div>
              <button onClick={() => setScholModal("add")} className={BTN}>
                <Plus className="h-4 w-4" /> Add Scholarship
              </button>
            </div>

            {scholarshipsLoading ? (
              <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
                <Loader2 className="h-6 w-6 animate-spin" /><span className="text-sm">Loading…</span>
              </div>
            ) : scholarships.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 py-20 text-center bg-white">
                <Award className="h-12 w-12 text-slate-200 mb-3" />
                <p className="font-bold text-slate-700">No scholarships yet</p>
                <p className="text-sm text-slate-400 mt-1 mb-5">Add financial aid opportunities for students.</p>
                <button onClick={() => setScholModal("add")} className={BTN}><Plus className="h-4 w-4" /> Add Scholarship</button>
              </div>
            ) : (
              <div className="space-y-3">
                {scholarships.map(s => (
                  <ScholarshipCard
                    key={s._id}
                    scholarship={s}
                    programs={programs}
                    onEdit={sc => setScholModal(sc)}
                    onDelete={openDelSchol}
                  />
                ))}
              </div>
            )}

            {actionError["createScholarship"] && (
              <p className="text-xs text-red-500 text-center">{actionError["createScholarship"]}</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}