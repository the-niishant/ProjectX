import React from "react";
import { Link } from "react-router-dom";

export class AppErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    window.dispatchEvent(new CustomEvent("elite-weavers:analytics", {
      detail: {
        name: "app_error",
        properties: { message: error.message, componentStack: info.componentStack }
      }
    }));
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="app-error-state" role="alert">
        <p className="section-kicker">Something went wrong</p>
        <h1>We could not load this page.</h1>
        <p>Please return to the collection and try again.</p>
        <Link className="primary-button" to="/collections">Return to the edit <span>↗</span></Link>
      </div>
    );
  }
}
