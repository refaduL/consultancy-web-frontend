export default function ProgressBar({ percentage }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">
          Overall Progress
        </span>
        <span className="text-sm font-bold text-indigo-600">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
