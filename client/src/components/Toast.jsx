import React from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className={`toast-notification-banner ${toast.type || "success"}`}>
      <div className="toast-icon">
        {toast.type === "error" ? (
          <AlertCircle size={18} />
        ) : toast.type === "info" ? (
          <Info size={18} />
        ) : (
          <CheckCircle2 size={18} />
        )}
      </div>
      <span className="toast-text">{toast.message}</span>
    </div>
  );
}
