import { Fragment } from "react";
import { Lock } from "lucide-react";
import DocumentItem from "./DocumentItem";
import ProgressBar from "./ProgressBar";

const statusMessageMap = {
  submitted: (
    <>
      Sorry, Your application is under review. <br />
      Documents will unlock after approval.
    </>
  ),
  accepted: "You can now upload and manage your documents.",
  rejected: "Your application was rejected. Please reapply to unlock document uploads.",
  approved: "All documents are finalized. No further action is needed.",
};

export default function DocumentsSection({
  applicationStatus,
  documents,
  completion,
  loadingDocKey,
  onUpload,
  onDelete,
}) {
  // const isLocked = applicationStatus !== "accepted";
  const isLocked = !["accepted", "approved"].includes(applicationStatus);

  const previewDocs = isLocked ? documents.slice(0, 5) : documents;

  return (
    <section className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Required Documents
        </h2>

        {isLocked && (
          <span className="text-xs font-medium bg-slate-100 text-slate-600 p-3 rounded-full">
            <Lock className="w-4 h-4 inline mr-1" />
            Locked
          </span>
        )}
      </div>

      {/* Progress */}
      <ProgressBar percentage={isLocked ? 0 : completion} />

      <div className="relative mt-6">
        {/* Document List */}
        <div
          className={`space-y-3 transition-all ${
            isLocked ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          {previewDocs.map((doc) => (
            <DocumentItem
              key={doc.id}
              doc={doc}
              onUpload={onUpload}
              onDelete={onDelete}
              loadingDocKey={loadingDocKey}
            />
          ))}
        </div>

        {/* 🔥 Bottom Fade Overlay */}
        {isLocked && documents.length > 3 && (
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent" />
        )}
      </div>

      {/* Center Overlay */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="bg-white/98 backdrop-blur-xl border border-slate-300 shadow-glow rounded-2xl px-8 py-6 text-center max-w-sm">
            
            <Lock className="mx-auto mb-3 w-7 h-7 text-slate-700 fill-red-500" />

            <h3 className="text-lg font-semibold text-slate-900">
              Documents Locked
            </h3>

            <p className="text-sm text-slate-600 mt-2">
              {statusMessageMap[applicationStatus] || "Document access depends on your application status."}
            </p>

            {/* Status hint */}
            <div className="mt-4 text-xs text-slate-500">
              Current status:{" "}
              <span className="font-medium capitalize">
                {applicationStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}