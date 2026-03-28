import { useState, useCallback } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Check,
  GraduationCap,
  FlaskConical,
  Globe,
  Wallet,
  User,
} from "lucide-react";
import { useApplication } from "../hooks/useApplication";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";

// Constants 

const COUNTRIES = [
  "USA", "UK", "Canada", "Australia", "Germany", "Netherlands",
  "France", "Sweden", "New Zealand", "Ireland", "Singapore", "Japan",
  "South Korea", "Switzerland", "Denmark", "Norway", "Finland", "Austria",
  "Belgium", "Italy", "Spain", "Portugal", "UAE", "Malaysia", "Other",
];

const INTAKES = [
  "Fall 2025", "Spring 2026", "Summer 2026",
  "Fall 2026", "Spring 2027", "Summer 2027",
];

const FUNDING_SOURCES = [
  { value: "Self-funded",     label: "Self-funded" },
  { value: "Education Loan",  label: "Education loan" },
  { value: "Scholarship",     label: "Scholarship" },
  { value: "Sponsor",         label: "Sponsored" },
];

const BUDGET_RANGES = [
  "Under $10,000",
  "$10,000 – $20,000",
  "$20,000 – $30,000",
  "$30,000 – $40,000",
  "$40,000+",
];

const GRADING_SCALES = ["4.0", "5.0", "10.0", "100%"];

const TEST_TYPES = [
  { key: "ielts",    label: "IELTS",        placeholder: "e.g. 7.5" },
  { key: "toefl",   label: "TOEFL iBT",    placeholder: "e.g. 105" },
  { key: "pte",     label: "PTE Academic",  placeholder: "e.g. 72" },
  { key: "duolingo",label: "Duolingo",      placeholder: "e.g. 130" },
  { key: "gre",     label: "GRE",          placeholder: "e.g. 320" },
  { key: "gmat",    label: "GMAT",         placeholder: "e.g. 680" },
];

const EMPTY_EDUCATION = {
  institution: "", degree: "", fieldOfStudy: "",
  graduationYear: "", gpa: "", grade_scale: "4.0",
};

const EMPTY_FORM = {
  // User fields (from userModel — only what's needed for judging)
  first_name: "",
  last_name: "",
  phone: "",
  nationality: "",
  country_of_residence: "",
  date_of_birth: "",
  gender: "",

  // Application: educationHistory
  educationHistory: [{ ...EMPTY_EDUCATION }],

  // Application: testScores
  testScores: {
    ielts:    { score: "", date: "" },
    toefl:    { score: "", date: "" },
    pte:      { score: "", date: "" },
    duolingo: { score: "", date: "" },
    gre:      { score: "", date: "" },
    gmat:     { score: "", date: "" },
  },

  // Application: preferences
  preferences: {
    preferredCountries:    [],
    preferredFieldOfStudy: "",
    preferredIntake:       "",
  },

  // Application: financial_info
  financial_info: {
    funding_source:  "",
    budget_range_usd: "",
  },
};

//  Step Definitions 

const STEPS = [
  { id: "personal",   label: "Personal",   icon: User },
  { id: "education",  label: "Education",  icon: GraduationCap },
  { id: "tests",      label: "Test scores",icon: FlaskConical },
  { id: "preferences",label: "Preferences",icon: Globe },
  { id: "financial",  label: "Financial",  icon: Wallet },
];

//  Shared Field Components 

const Field = ({ label, required, error, children, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
    )}
    {children}
    {error && <p className="text-xs text-rose-500">{error}</p>}
  </div>
);

const inputCls = `
  w-full px-3.5 py-2.5 text-sm text-slate-800 bg-white
  border border-slate-200 rounded-lg outline-none
  placeholder:text-slate-400
  focus:border-slate-400 focus:ring-2 focus:ring-slate-100
  transition-all duration-150
`.trim();

const selectCls = `${inputCls} cursor-pointer appearance-none bg-no-repeat`
  .replace("placeholder:text-slate-400 ", "");

//  Step Components ─

function StepPersonal({ data, onChange, errors }) {
  const set = (key) => (e) => onChange({ [key]: e.target.value });

  return (
    <div className="space-y-5">
      <StepHeading
        title="Personal information"
        desc="Tell us a little about yourself so we can personalise your consultation."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="First name" required error={errors.first_name}>
          <input
            className={inputCls}
            placeholder="Aisha"
            value={data.first_name}
            onChange={set("first_name")}
          />
        </Field>
        <Field label="Last name" error={errors.last_name}>
          <input
            className={inputCls}
            placeholder="Rahman"
            value={data.last_name}
            onChange={set("last_name")}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone / WhatsApp" required error={errors.phone}>
          <input
            className={inputCls}
            placeholder="+880 17..."
            value={data.phone}
            onChange={set("phone")}
          />
        </Field>
        <Field label="Nationality" required error={errors.nationality}>
          <input
            className={inputCls}
            placeholder="Bangladeshi"
            value={data.nationality}
            onChange={set("nationality")}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Country of residence" required error={errors.country_of_residence}>
          <input
            className={inputCls}
            placeholder="Bangladesh"
            value={data.country_of_residence}
            onChange={set("country_of_residence")}
          />
        </Field>
        <Field label="Date of birth">
          <input
            type="date"
            className={inputCls}
            value={data.date_of_birth}
            onChange={set("date_of_birth")}
          />
        </Field>
      </div>

      <Field label="Gender">
        <div className="flex gap-3">
          {["Male", "Female", "Other"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onChange({ gender: g })}
              className={`flex-1 py-2.5 text-sm rounded-lg border transition-all duration-150 ${
                data.gender === g
                  ? "border-slate-800 bg-slate-800 text-white font-medium"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

function StepEducation({ data, onChange, errors }) {
  const entries = data.educationHistory;

  const update = (idx, key, value) => {
    const next = entries.map((e, i) => (i === idx ? { ...e, [key]: value } : e));
    onChange({ educationHistory: next });
  };

  const add = () =>
    onChange({ educationHistory: [...entries, { ...EMPTY_EDUCATION }] });

  const remove = (idx) =>
    onChange({ educationHistory: entries.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-5">
      <StepHeading
        title="Education background"
        desc="Add your most recent qualification first. You can add multiple entries."
      />

      <div className="space-y-4">
        {entries.map((edu, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-xl p-4 space-y-4 bg-slate-50/50"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Qualification {idx + 1}
              </span>
              {entries.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Institution / University" required>
                <input
                  className={inputCls}
                  placeholder="University of Dhaka"
                  value={edu.institution}
                  onChange={(e) => update(idx, "institution", e.target.value)}
                />
              </Field>
              <Field label="Degree" required>
                <input
                  className={inputCls}
                  placeholder="Bachelor of Science"
                  value={edu.degree}
                  onChange={(e) => update(idx, "degree", e.target.value)}
                />
              </Field>
              <Field label="Field of study" required>
                <input
                  className={inputCls}
                  placeholder="Computer Science"
                  value={edu.fieldOfStudy}
                  onChange={(e) => update(idx, "fieldOfStudy", e.target.value)}
                />
              </Field>
              <Field label="Graduation year" required>
                <input
                  className={inputCls}
                  placeholder="2024"
                  type="number"
                  min="1980"
                  max="2030"
                  value={edu.graduationYear}
                  onChange={(e) => update(idx, "graduationYear", e.target.value)}
                />
              </Field>
              <Field label="GPA / Score">
                <input
                  className={inputCls}
                  placeholder="3.75"
                  value={edu.gpa}
                  onChange={(e) => update(idx, "gpa", e.target.value)}
                />
              </Field>
              <Field label="Grading scale">
                <div className="flex gap-2 flex-wrap">
                  {GRADING_SCALES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => update(idx, "grade_scale", s)}
                      className={`px-3 py-2 text-xs rounded-lg border transition-all duration-150 ${
                        edu.grade_scale === s
                          ? "border-slate-700 bg-slate-700 text-white font-medium"
                          : "border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 border border-dashed border-slate-300 hover:border-slate-400 rounded-xl px-4 py-3 w-full justify-center transition-all duration-150"
      >
        <Plus size={15} />
        Add another qualification
      </button>
    </div>
  );
}

function StepTests({ data, onChange }) {
  const update = (key, field, value) => {
    onChange({
      testScores: {
        ...data.testScores,
        [key]: { ...data.testScores[key], [field]: value },
      },
    });
  };

  return (
    <div className="space-y-5">
      <StepHeading
        title="Test scores"
        desc="Fill in only the tests you have taken. Leave blank if not applicable."
      />

      <div className="space-y-3">
        {TEST_TYPES.map(({ key, label, placeholder }) => {
          const hasScore = data.testScores[key]?.score?.length > 0;
          return (
            <div
              key={key}
              className={`border rounded-xl p-4 transition-all duration-150 ${
                hasScore ? "border-slate-300 bg-white" : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-24 flex-shrink-0">
                  <span className="text-sm font-semibold text-slate-700">{label}</span>
                </div>
                <div className="flex-1 grid sm:grid-cols-2 gap-3">
                  <input
                    className={inputCls}
                    placeholder={`Score (${placeholder})`}
                    value={data.testScores[key]?.score || ""}
                    onChange={(e) => update(key, "score", e.target.value)}
                  />
                  <input
                    type="date"
                    className={inputCls}
                    title="Test date"
                    value={data.testScores[key]?.date || ""}
                    onChange={(e) => update(key, "date", e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 text-center">
        Haven't taken any tests yet? No problem — leave everything blank and we'll guide you.
      </p>
    </div>
  );
}

function StepPreferences({ data, onChange, errors }) {
  const prefs = data.preferences;

  const toggleCountry = (country) => {
    const current = prefs.preferredCountries;
    const next = current.includes(country)
      ? current.filter((c) => c !== country)
      : [...current, country];
    onChange({ preferences: { ...prefs, preferredCountries: next } });
  };

  return (
    <div className="space-y-6">
      <StepHeading
        title="Study preferences"
        desc="Where and what you'd like to study — we'll use this to match your profile."
      />

      <Field label="Preferred countries" required error={errors["preferences.preferredCountries"]}>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => {
            const selected = prefs.preferredCountries.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCountry(c)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-150 ${
                  selected
                    ? "border-slate-800 bg-slate-800 text-white font-medium"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Preferred field of study" required error={errors["preferences.preferredFieldOfStudy"]}>
          <input
            className={inputCls}
            placeholder="e.g. Computer Science, MBA"
            value={prefs.preferredFieldOfStudy}
            onChange={(e) =>
              onChange({ preferences: { ...prefs, preferredFieldOfStudy: e.target.value } })
            }
          />
        </Field>

        <Field label="Preferred intake" required error={errors["preferences.preferredIntake"]}>
          <div className="relative">
            <select
              className={selectCls}
              value={prefs.preferredIntake}
              onChange={(e) =>
                onChange({ preferences: { ...prefs, preferredIntake: e.target.value } })
              }
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundPosition: "right 12px center", backgroundRepeat: "no-repeat", paddingRight: "36px" }}
            >
              <option value="">Select intake…</option>
              {INTAKES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </Field>
      </div>
    </div>
  );
}

function StepFinancial({ data, onChange, errors }) {
  const fi = data.financial_info;

  return (
    <div className="space-y-6">
      <StepHeading
        title="Financial information"
        desc="Helps us recommend realistic options and scholarship pathways."
      />

      <Field label="Funding source" required error={errors["financial_info.funding_source"]}>
        <div className="grid sm:grid-cols-2 gap-3">
          {FUNDING_SOURCES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ financial_info: { ...fi, funding_source: value } })}
              className={`py-3 px-4 text-sm rounded-xl border text-left transition-all duration-150 ${
                fi.funding_source === value
                  ? "border-slate-800 bg-slate-800 text-white font-medium"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Annual budget (USD)" error={errors["financial_info.budget_range_usd"]}>
        <div className="grid sm:grid-cols-2 gap-2">
          {BUDGET_RANGES.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => onChange({ financial_info: { ...fi, budget_range_usd: range } })}
              className={`py-2.5 px-3 text-sm rounded-lg border text-left transition-all duration-150 ${
                fi.budget_range_usd === range
                  ? "border-slate-800 bg-slate-800 text-white font-medium"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </Field>

      {/* Summary review before submit */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Review summary</p>
        <SummaryLine label="Name" value={`${data.first_name} ${data.last_name}`.trim()} />
        <SummaryLine label="Phone" value={data.phone} />
        <SummaryLine label="Nationality" value={data.nationality} />
        <SummaryLine label="Country" value={data.country_of_residence} />
        <SummaryLine label="Education entries" value={data.educationHistory.length} />
        <SummaryLine
          label="Test scores"
          value={
            Object.entries(data.testScores)
              .filter(([, v]) => v?.score)
              .map(([k]) => k.toUpperCase())
              .join(", ") || "None yet"
          }
        />
        <SummaryLine
          label="Countries"
          value={data.preferences.preferredCountries.join(", ") || "—"}
        />
        <SummaryLine label="Field" value={data.preferences.preferredFieldOfStudy || "—"} />
        <SummaryLine label="Intake" value={data.preferences.preferredIntake || "—"} />
        <SummaryLine label="Funding" value={fi.funding_source || "—"} />
        <SummaryLine label="Budget" value={fi.budget_range_usd || "—"} />
      </div>
    </div>
  );
}

//  Small helpers ─

const SummaryLine = ({ label, value }) => (
  <div className="flex justify-between text-sm gap-4">
    <span className="text-slate-400 flex-shrink-0">{label}</span>
    <span className="text-slate-700 font-medium text-right">{String(value)}</span>
  </div>
);

const StepHeading = ({ title, desc }) => (
  <div className="space-y-1 pb-2 border-b border-slate-100">
    <h2 className="text-base font-semibold text-slate-800">{title}</h2>
    <p className="text-sm text-slate-400">{desc}</p>
  </div>
);

//  Validation 

function validate(step, data) {
  const errors = {};
  if (step === 0) {
    if (!data.first_name.trim()) errors.first_name = "Required";
    if (!data.phone.trim()) errors.phone = "Required";
    if (!data.nationality.trim()) errors.nationality = "Required";
    if (!data.country_of_residence.trim()) errors.country_of_residence = "Required";
  }
  if (step === 1) {
    data.educationHistory.forEach((e, i) => {
      if (!e.institution.trim()) errors[`edu_${i}_institution`] = "Required";
      if (!e.degree.trim()) errors[`edu_${i}_degree`] = "Required";
      if (!e.fieldOfStudy.trim()) errors[`edu_${i}_fieldOfStudy`] = "Required";
      if (!e.graduationYear) errors[`edu_${i}_graduationYear`] = "Required";
    });
  }
  if (step === 3) {
    if (!data.preferences.preferredCountries.length)
      errors["preferences.preferredCountries"] = "Select at least one country";
    if (!data.preferences.preferredFieldOfStudy.trim())
      errors["preferences.preferredFieldOfStudy"] = "Required";
    if (!data.preferences.preferredIntake)
      errors["preferences.preferredIntake"] = "Required";
  }
  if (step === 4) {
    if (!data.financial_info.funding_source)
      errors["financial_info.funding_source"] = "Select a funding source";
  }
  return errors;
}

//  Main Component 

export default function ConsultationForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { submitApplication } = useApplication(null, form);
  const { user } = useAuth();
  const { addToast } = useToast();

  const merge = useCallback((patch) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors({});
  }, []);

  const goNext = () => {
    const errs = validate(step, form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    const errs = validate(step, form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await submitApplication(form);
      setSubmitted(true);
      addToast({
        type: "success",
        title: "Application submitted",
        description: "Thank you for applying!",
      });

    } catch (e) {
      console.error("Submission error:", e);
      addToast({
        type: "error",
        title: "Submission Failed",
        description: "Failed to submit application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <SuccessScreen />;

  const StepComponent = [
    StepPersonal, StepEducation, StepTests, StepPreferences, StepFinancial,
  ][step];

  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">
            Free Consultation
          </span>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Apply for consultation
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
            A 5-minute application so we can match you with the right advisor.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-8">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      done
                        ? "bg-slate-800 text-white"
                        : active
                        ? "bg-white border-2 border-slate-800 text-slate-800"
                        : "bg-white border border-slate-200 text-slate-300"
                    }`}
                  >
                    {done ? <Check size={15} strokeWidth={2.5} /> : <Icon size={14} />}
                  </div>
                  <span
                    className={`text-[10px] font-medium whitespace-nowrap transition-colors ${
                      active ? "text-slate-800" : done ? "text-slate-500" : "text-slate-300"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-2 mb-5 transition-all duration-500 ${
                      i < step ? "bg-slate-800" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          {/* Progress bar */}
          <div className="h-1 rounded-t-2xl overflow-hidden bg-slate-100">
            <div
              className="h-full bg-slate-800 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-6 sm:p-8">
            <StepComponent
              data={form}
              onChange={merge}
              errors={errors}
            />
          </div>

          {/* Footer nav */}
          <div className="px-6 sm:px-8 pb-6 flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors py-2 px-1"
            >
              <ChevronLeft size={15} />
              Back
            </button>

            <span className="text-xs text-slate-300 tabular-nums">
              {step + 1} / {STEPS.length}
            </span>

            <button
              type="button"
              onClick={isLast ? handleSubmit : goNext}
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-slate-900 hover:bg-slate-700 text-white rounded-xl transition-all duration-150 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting…
                </>
              ) : isLast ? (
                <>Submit <Check size={14} /></>
              ) : (
                <>Next <ChevronRight size={14} /></>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Your information is secure and only used to improve your consultation.
        </p>
      </div>
    </div>
  );
}

//  Success Screen 

function SuccessScreen() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Application received</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Thank you for applying. An advisor will review your profile and reach out
          within 1–2 business days to schedule your consultation.
        </p>
        <div className="mt-8 border border-slate-200 rounded-xl p-4 bg-white text-left space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">What happens next</p>
          {[
            "Your profile is reviewed by our team",
            "You're matched with a specialist advisor",
            "You receive a personalised consultation",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
                {i + 1}
              </span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}