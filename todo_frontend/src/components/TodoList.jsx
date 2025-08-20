import React from "react";
import TodoItem from "./TodoItem";

/**
 * Render the list of todos with the layout and classes matching the Figma-derived CSS.
 */
// PUBLIC_INTERFACE
export default function TodoList({ items, onEdit, onDelete, onToggle }) {
  return (
    <>
      {items.map((t) => (
        <TodoItem
          key={t.id}
          item={t}
          onEdit={() => onEdit?.(t.id)}
          onDelete={() => onDelete?.(t.id)}
          onToggle={() => onToggle?.(t.id)}
        />
      ))}
      {items.length === 0 && (
        <div
          style={{
            width: 400,
            margin: "8px 7px",
            color: "var(--typo-7-color)",
            fontSize: "var(--typo-0-size)",
          }}
          aria-live="polite"
        >
          No todos to display.
        </div>
      )}
    </>
  );
}
