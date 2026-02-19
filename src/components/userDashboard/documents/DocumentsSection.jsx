import DocumentItem from "./DocumentItem";
import ProgressBar from "./ProgressBar";

export default function DocumentsSection({
  documents,
  completion,
  loadingDocKey,
  onUpload,
  onDelete,
}) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex-1">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Required Documents
      </h2>

      <ProgressBar percentage={completion} />

      <div className="space-y-3 mt-6">
        {documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            doc={doc}
            onUpload={onUpload}
            onDelete={onDelete}
            loadingDocKey={loadingDocKey}
          />
        ))}
      </div>
    </section>
  );
}
