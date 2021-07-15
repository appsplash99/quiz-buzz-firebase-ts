import { ToastContainer, toast } from "react-toastify";
import { toggleToast } from "../../utils/customToastStyles";

export interface ToastCtxType {
  toast: typeof toast;
  ToastContainer: typeof ToastContainer;
  toggleToast: typeof toggleToast;
}

export interface toggleToastType {
  toast: typeof toast;
  toastType: "error" | "dark" | "success" | "warning" | "info";
  messege: string;
}
