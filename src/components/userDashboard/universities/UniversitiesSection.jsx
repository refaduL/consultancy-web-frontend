import UniversityCard from "./UniversityCard";

export default function UniversitiesSection({ universities }) {
  return (
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        My Interested Universities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {universities.map((u) => (
          <UniversityCard key={u.id} uni={u} />
        ))}
      </div>
    </section>
  );
}
