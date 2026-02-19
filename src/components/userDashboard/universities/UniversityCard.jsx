import { Globe, Heart } from "lucide-react";

export default function UniversityCard({ uni }) {
  return (
    <div className="group relative bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={uni.image}
          alt={uni.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900 mb-1 truncate">{uni.name}</h3>
        <p className="text-sm text-slate-600 mb-3 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" /> {uni.country}
        </p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600">
            QS Rank:{" "}
            <span className="font-bold text-slate-900">#{uni.ranking}</span>
          </span>
          <span className="text-slate-600">
            Tuition:{" "}
            <span className="font-bold text-slate-900">
              ${(uni.tuition / 1000).toFixed(0)}K
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
