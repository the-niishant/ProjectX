import React from "react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-kicker">404 · Uncharted Loom</span>
        <h1 className="not-found-title">
          This thread leads<br />
          <em>to a quiet room.</em>
        </h1>
        <p className="not-found-text">
          The page you requested does not exist or may have been archived. Rejoin our main curations below.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="primary-button">
            Return to home <span>↗</span>
          </Link>
          <Link to="/collections" className="quiet-link">
            Explore collections
          </Link>
        </div>
      </div>
    </div>
  );
}
