// pages/CreateUniversityPage.jsx
// Wired to universityService.createUniversity — no local stubs.
// On success redirects to the detail page for the newly created university.

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Save, Loader2, AlertTriangle } from "lucide-react";
import { createUniversity } from "../../services/universityService";
import { useToast } from "../../hooks/useToast";


// ─── Design tokens ────────────────────────────────────────────────────
const inputCls  = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100";
const labelCls  = "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-400";
const sectionHd = "text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100";

// ─── Initial form state ───────────────────────────────────────────────
const initialForm = {
  name:                     "",
  native_name:              "",
  type:                     "Public",
  established_year:         "",
  city:                     "",
  country:                  "",
  description:              "",
  website_url:              "",
  logo_url:                 "",
  general_application_info: "",
  acceptance_rate:          "",
  rankings:     { qs: "", times: "", us_news: "" },
  contact_info: { email: "", phone: "", address: "" },
  facilities:   [""],
};

// ─── Field wrapper ────────────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div>
      <label className={labelCls}>
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════
export default function CreateUniversityPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [form,        setForm]        = useState(initialForm);
  const [errors,      setErrors]      = useState({});
  const [submitError, setSubmitError] = useState(null); // server-level error message
  const [isSubmitting,setIsSubmitting]= useState(false);

  const types = useMemo(() => ["Public","Private","Technical","Research","Liberal Arts","Other"], []);

  // ─── Field helpers ──────────────────────────────────────────────────
  const setField  = (key, value)        => setForm(p => ({ ...p, [key]: value }));
  const setNested = (parent, key, value)=> setForm(p => ({ ...p, [parent]: { ...p[parent], [key]: value } }));

  const updateFacility = (index, value) => {
    const updated = [...form.facilities];
    updated[index] = value;
    setField("facilities", updated);
  };
  const addFacility    = ()      => setField("facilities", [...form.facilities, ""]);
  const removeFacility = (index) => {
    const updated = form.facilities.filter((_, i) => i !== index);
    setField("facilities", updated.length ? updated : [""]);
  };

  // ─── Validation ─────────────────────────────────────────────────────
  const validate = () => {
    const next = {};
    if (!form.name.trim())    next.name    = "University name is required";
    if (!form.city.trim())    next.city    = "City is required";
    if (!form.country.trim()) next.country = "Country is required";
    
    // Validate acceptance rate if provided
    if (form.acceptance_rate && form.acceptance_rate.trim()) {
      const rate = parseFloat(form.acceptance_rate);
      if (isNaN(rate) || rate < 0 || rate > 100) {
        next.acceptance_rate = "Acceptance rate must be a number between 0 and 100";
      }
    }
    
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ─── Submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        established_year: form.established_year ? Number(form.established_year) : undefined,
        acceptance_rate: form.acceptance_rate ? parseFloat(form.acceptance_rate) : undefined,
        // Filter out empty facility strings before sending
        facilities: form.facilities.filter(Boolean),
        rankings: {
          qs:      form.rankings.qs      ? Number(form.rankings.qs)      : null,
          times:   form.rankings.times   ? Number(form.rankings.times)   : null,
          us_news: form.rankings.us_news ? Number(form.rankings.us_news) : null,
        },
      };

      // createUniversity returns { statusCode, message, payload: { university } }
      console.log("new uni info: ", payload);
      const res = await createUniversity(payload);
      const newId = res?.payload?.university?._id;

      // Navigate to the detail page so the admin can add programs / scholarships
      navigate(`/admindashboard/universities/${newId}`);
    } catch (err) {
      // Surface a human-readable server error at the top of the form
      addToast({ title: "Error", description: err.response?.data?.message || err.message || "Failed to create university. Please try again.", type: "error" });
      setSubmitError(err.response?.data?.message || err.message || "Failed to create university. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-8">

        {/* Back */}
        <button
          onClick={() => navigate("/admindashboard/universities")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Universities
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="mb-1 text-2xl font-extrabold text-slate-900 tracking-tight">Create University</h1>
          <p className="mb-7 text-sm text-slate-500">Fill in the details below. You can add programs and scholarships after saving.</p>

          {/* Server-level error banner */}
          {submitError && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ── Basic Info ─────────────────────────────────────────── */}
            <div>
              <p className={sectionHd}>Basic Info</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="University Name" required error={errors.name}>
                    <input className={inputCls} value={form.name} onChange={e => setField("name", e.target.value)} placeholder="e.g. University of Oxford" />
                  </Field>
                </div>
                <Field label="Native / Local Name">
                  <input className={inputCls} value={form.native_name} onChange={e => setField("native_name", e.target.value)} placeholder="e.g. Technische Universität München" />
                </Field>
                <Field label="Type">
                  <select className={inputCls} value={form.type} onChange={e => setField("type", e.target.value)}>
                    {types.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="City" required error={errors.city}>
                  <input className={inputCls} value={form.city} onChange={e => setField("city", e.target.value)} />
                </Field>
                <Field label="Country" required error={errors.country}>
                  <input className={inputCls} value={form.country} onChange={e => setField("country", e.target.value)} />
                </Field>
                <Field label="Established Year">
                  <input type="number" className={inputCls} value={form.established_year} onChange={e => setField("established_year", e.target.value)} placeholder="e.g. 1861" />
                </Field>
                <Field label="Acceptance Rate (%)" error={errors.acceptance_rate}>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="100"
                      className={inputCls + " pr-12"} 
                      value={form.acceptance_rate} 
                      onChange={e => setField("acceptance_rate", e.target.value)} 
                      placeholder="e.g. 15.5" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                  </div>
                </Field>
              </div>
            </div>

            {/* ── Links & Media ──────────────────────────────────────── */}
            <div>
              <p className={sectionHd}>Links & Media</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Website URL">
                  <input className={inputCls} value={form.website_url} onChange={e => setField("website_url", e.target.value)} placeholder="https://" />
                </Field>
                <Field label="Logo URL">
                  <input className={inputCls} value={form.logo_url} onChange={e => setField("logo_url", e.target.value)} placeholder="https://" />
                </Field>
              </div>
            </div>

            {/* ── Description ────────────────────────────────────────── */}
            <div>
              <p className={sectionHd}>Description</p>
              <div className="space-y-4">
                <Field label="Description">
                  <textarea rows={4} className={inputCls + " resize-none"} value={form.description} onChange={e => setField("description", e.target.value)} />
                </Field>
                <Field label="General Application Info">
                  <textarea rows={2} className={inputCls + " resize-none"} value={form.general_application_info} onChange={e => setField("general_application_info", e.target.value)} placeholder="e.g. Applications open September–January for Fall intake." />
                </Field>
              </div>
            </div>

            {/* ── Rankings ───────────────────────────────────────────── */}
            <div>
              <p className={sectionHd}>Rankings</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <Field label="QS World Ranking">
                  <input type="number" className={inputCls} value={form.rankings.qs} onChange={e => setNested("rankings","qs",e.target.value)} placeholder="—" />
                </Field>
                <Field label="Times Higher Ed">
                  <input type="number" className={inputCls} value={form.rankings.times} onChange={e => setNested("rankings","times",e.target.value)} placeholder="—" />
                </Field>
                <Field label="US News Ranking">
                  <input type="number" className={inputCls} value={form.rankings.us_news} onChange={e => setNested("rankings","us_news",e.target.value)} placeholder="—" />
                </Field>
              </div>
            </div>

            {/* ── Contact Info ───────────────────────────────────────── */}
            <div>
              <p className={sectionHd}>Contact Info</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Email">
                  <input className={inputCls} value={form.contact_info.email} onChange={e => setNested("contact_info","email",e.target.value)} placeholder="admissions@university.edu" />
                </Field>
                <Field label="Phone">
                  <input className={inputCls} value={form.contact_info.phone} onChange={e => setNested("contact_info","phone",e.target.value)} placeholder="+1 617-000-0000" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Address">
                    <input className={inputCls} value={form.contact_info.address} onChange={e => setNested("contact_info","address",e.target.value)} placeholder="Street, City, State, ZIP" />
                  </Field>
                </div>
              </div>
            </div>

            {/* ── Facilities ─────────────────────────────────────────── */}
            <div>
              <p className={sectionHd}>Facilities</p>
              <div className="space-y-3 mb-3">
                {form.facilities.map((f, i) => (
                  <div key={i} className="flex gap-3">
                    <input
                      className={inputCls}
                      value={f}
                      onChange={e => updateFacility(i, e.target.value)}
                      placeholder="e.g. Library, Sports Center, On-campus Housing…"
                    />
                    <button
                      type="button"
                      onClick={() => removeFacility(i)}
                      className="flex-shrink-0 rounded-xl border border-red-200 px-3 text-red-500 hover:bg-red-50 transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addFacility}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                <Plus className="h-4 w-4" /> Add Facility
              </button>
            </div>

            {/* ── Submit ─────────────────────────────────────────────── */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate("/admindashboard?tab=universities")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition disabled:opacity-50">
                {isSubmitting
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating…</>
                  : <><Save className="h-4 w-4" /> Create University</>
                }
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}