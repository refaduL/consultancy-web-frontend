import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const typeConfig = {
  success: {
    accent: "from-emerald-400 to-emerald-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    border: "border-emerald-200",
    progress: "bg-emerald-500",
    icon: "✓",
  },
  error: {
    accent: "from-rose-400 to-rose-600",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    border: "border-rose-200",
    progress: "bg-rose-500",
    icon: "✕",
  },
  warning: {
    accent: "from-amber-400 to-amber-600",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    border: "border-amber-200",
    progress: "bg-amber-500",
    icon: "⚠",
  },
  default: {
    accent: "from-slate-400 to-slate-600",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    border: "border-slate-200",
    progress: "bg-slate-700",
    icon: "•",
  },
};

export default function ToastItem({
  id,
  title,
  description,
  type = "default",
  duration = 4000,
  removeToast,
}) {
  const config = typeConfig[type] || typeConfig.default;

  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const remainingRef = useRef(duration);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = remainingRef.current - elapsed;

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        removeToast(id);
      } else {
        setProgress((remaining / duration) * 100);
      }
    }, 40);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    remainingRef.current -= elapsed;
  };

  const resumeTimer = () => {
    startTimeRef.current = Date.now();
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <motion.div
      layout
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > 120) removeToast(id);
      }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
      }}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      className={`
        relative
        w-[340px]
        overflow-hidden
        rounded-3xl
        border
        ${config.border}
        bg-white/85 backdrop-blur-2xl
        shadow-2xl
        p-5
      `}
    >
      {/* Accent Glow */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${config.accent}`}
      />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`
            flex items-center justify-center
            w-11 h-11
            rounded-2xl
            ${config.iconBg}
            ${config.iconColor}
            text-lg font-bold
            shadow-inner
          `}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="text-base font-semibold text-slate-900">{title}</h4>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => removeToast(id)}
          className="
            text-slate-400 
            hover:text-slate-700 
            transition-colors 
            text-lg
          "
        >
          ×
        </button>
      </div>

      {/* Progress Track */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-black/5">
        <motion.div
          className={`h-full ${config.progress}`}
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
