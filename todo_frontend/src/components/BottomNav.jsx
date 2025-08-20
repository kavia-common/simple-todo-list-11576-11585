import React from "react";

// PUBLIC_INTERFACE
export default function BottomNav({ activeFilter, onChange }) {
  /** Bottom navigation containing All and Completed filters */
  const onActivate = (f) => {
    if (f !== activeFilter) onChange?.(f);
  };

  return (
    <nav className="bottom-bar" role="navigation" aria-label="Filters">
      <div
        className={`bottom-tab ${activeFilter === "all" ? "active" : ""}`}
        data-filter="all"
        tabIndex={0}
        aria-label="Show all todos"
        onClick={() => onActivate("all")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onActivate("all");
          }
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h12" />
          <path d="M4 10h12" />
          <path d="M4 14h8" />
        </svg>
        <div className="label">All</div>
      </div>
      <div
        className={`bottom-tab ${activeFilter === "completed" ? "active" : ""}`}
        data-filter="completed"
        tabIndex={0}
        aria-label="Show completed todos"
        onClick={() => onActivate("completed")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onActivate("completed");
          }
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 13l4 4L19 7" />
        </svg>
        <div className="label">Completed</div>
      </div>
    </nav>
  );
}
