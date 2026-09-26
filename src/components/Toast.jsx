import React from "react";
import { useStore } from "../context/StoreContext";

export function Toast() {
  const { toast, dismissToast } = useStore();

  if (!toast) return null;

  return (
    <div className="toast-notification" role="status" aria-live="polite">
      <span className="toast-text">{toast}</span>
      <button
        className="toast-dismiss-btn"
        onClick={dismissToast}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
