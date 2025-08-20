import React from "react";

// PUBLIC_INTERFACE
export default function TodoItem({ item, onEdit, onDelete, onToggle }) {
  /** Renders a single todo card with title/subtitle and action icons */
  return (
    <article className={`todo-card${item.completed ? " completed" : ""}`} data-id={item.id}>
      <div className="todo-texts">
        <div className="todo-title">{(item.title || "TODO TITLE").toUpperCase()}</div>
        <div className="todo-subtitle">{(item.subtitle || "TODO SUB TITLE").toUpperCase()}</div>
      </div>
      <div className="todo-actions">
        <button className="icon-btn edit" aria-label="Edit todo" onClick={onEdit}>
          <svg viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Z" />
            <path d="M14.06 4.69l3.75 3.75" />
          </svg>
        </button>
        <button className="icon-btn delete" aria-label="Delete todo" onClick={onDelete}>
          <svg viewBox="0 0 24 24">
            <path d="M3 6h18" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
        <button
          className="icon-btn check"
          aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
          onClick={onToggle}
        >
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12l3 3 5-6" />
          </svg>
        </button>
      </div>
    </article>
  );
}
