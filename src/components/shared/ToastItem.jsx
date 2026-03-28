import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const typeConfig = {
  success: {
    accent: "bg-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    progress: "bg-emerald-500",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 4L6 11l-3-3" />
      </svg>
    ),
  },
  error: {
    accent: "bg-red-500",
    iconBg: "bg-red-50 dark:bg-red-950",
    iconColor: "text-red-600 dark:text-red-400",
    progress: "bg-red-500",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 5v4M8 11v.5" />
        <circle cx="8" cy="8" r="6.5" />
      </svg>
    ),
  },
  warning: {
    accent: "bg-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
    progress: "bg-amber-500",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2L1.5 13.5h13L8 2z" />
        <path d="M8 7v3M8 11.5v.5" />
      </svg>
    ),
  },
  info: {
    accent: "bg-indigo-500",
    iconBg: "bg-indigo-50 dark:bg-indigo-950",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    progress: "bg-indigo-500",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 7.5v4M8 5v.5" />
      </svg>
    ),
  },
  default: {
    accent: "bg-slate-500",
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-600 dark:text-slate-400",
    progress: "bg-slate-500",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 7.5v4M8 5v.5" />
      </svg>
    ),
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
  const config = typeConfig[type] ?? typeConfig.default;

  const rafRef       = useRef(null);
  const startedAtRef = useRef(null);
  const remainingRef = useRef(duration);
  const pausedRef    = useRef(false);
  const [progress, setProgress] = useState(1); // 1 → 0

  const tick = (now) => {
    if (pausedRef.current) return;
    const elapsed  = now - startedAtRef.current;
    const pct      = Math.max(0, 1 - elapsed / remainingRef.current);
    setProgress(pct);
    if (pct > 0) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      removeToast(id);
    }
  };

  const startTimer = () => {
    startedAtRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  };

  const pauseTimer = () => {
    if (pausedRef.current) return;
    pausedRef.current = true;
    cancelAnimationFrame(rafRef.current);
    const elapsed = performance.now() - startedAtRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
  };

  const resumeTimer = () => {
    if (!pausedRef.current) return;
    pausedRef.current = false;
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <motion.div
      layout
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) removeToast(id);
      }}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 16, scale: 0.97, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      className="relative w-full max-w-[380px] overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-900 pb-[18px]"
    >
      {/* Top accent bar */}
      <div className={`absolute inset-x-0 top-0 h-[2px] ${config.accent}`} />

      {/* Body */}
      <div className="flex items-start gap-3 px-3.5 pt-4">
        {/* Icon */}
        <div
          className={`
            mt-px flex-shrink-0 w-[30px] h-[30px] rounded-lg
            flex items-center justify-center
            ${config.iconBg} ${config.iconColor}
          `}
        >
          {config.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-[13.5px] font-medium leading-snug text-slate-900 dark:text-slate-100">
            {title}
          </p>
          {description && (
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>

        {/* Close */}
        <button
          onClick={() => removeToast(id)}
          className="
            mt-0.5 flex-shrink-0 w-[22px] h-[22px] rounded-md
            flex items-center justify-center
            text-slate-400 dark:text-slate-500
            hover:bg-slate-100 dark:hover:bg-slate-800
            hover:text-slate-700 dark:hover:text-slate-200
            transition-colors
          "
          aria-label="Dismiss"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M1 1l8 8M9 1L1 9" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full origin-left ${config.progress} transition-none`}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </motion.div>
  );
}