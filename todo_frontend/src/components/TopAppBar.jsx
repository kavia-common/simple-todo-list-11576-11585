import React from "react";

// PUBLIC_INTERFACE
export default function AppBar() {
  /** Top app bar with title and calendar icon according to extracted design */
  return (
    <header className="app-bar" role="banner">
      <h1 className="app-title">TODO APP</h1>
      <div className="app-calendar" aria-hidden="true" title="Calendar">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
          <line x1="3" y1="9" x2="21" y2="9" stroke="white" strokeWidth="1.5" />
          <line x1="8" y1="3" x2="8" y2="7" stroke="white" strokeWidth="1.5" />
          <line x1="16" y1="3" x2="16" y2="7" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
    </header>
  );
}
