import { createContext, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToastContainer from "../components/shared/ToastContainer";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, description, type = "default", duration = 4000 }) => {
      const id = uuidv4();
      setToasts((prev) => [...prev, { id, title, description, type, duration }]);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
