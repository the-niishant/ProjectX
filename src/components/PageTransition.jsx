import React from "react";
import { useLocation } from "react-router-dom";

export function PageTransition({ children }) {
  const location = useLocation();
  const transitionKey = `${location.pathname}${location.search}`;

  return (
    <div className="page-transition" key={transitionKey}>
      <span className="page-transition-wash" aria-hidden="true" />
      {children}
    </div>
  );
}
