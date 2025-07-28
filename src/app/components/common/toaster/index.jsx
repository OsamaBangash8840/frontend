// utils/toastUtils.js
import { toast } from "sonner";

// Success Toast
export const showSuccessToast = (message, description) => {
  toast.success(message, {
    description,
    duration: 4000,
    className: "bg-green-600 text-white",
  });
};

// Error Toast
export const showErrorToast = (message, description) => {
  toast.error(message, {
    description,
    duration: 4000,
    className: "bg-red-600 text-white",
  });
};

// Info or Pending Toast
export const showInfoToast = (message, description) => {
  toast(message, {
    description,
    duration: 4000,
    className: "bg-blue-600 text-white",
  });
};
