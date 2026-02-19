import { AnimatePresence } from "framer-motion";
import ToastItem from "./ToastItem";

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            {...toast}
            removeToast={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
