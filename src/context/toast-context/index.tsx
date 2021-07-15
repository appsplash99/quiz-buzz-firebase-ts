import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toggleToast } from "../../utils/customToastStyles";
import { ToastCtxType } from "./toast-context.types";

const ToastContext = createContext<ToastCtxType>({ toast, toggleToast, ToastContainer });

export const ToastProvider: React.FC = ({ children }) => {
  return <ToastContext.Provider value={{ ToastContainer, toast, toggleToast }}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);
