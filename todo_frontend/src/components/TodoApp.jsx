import React, { useEffect, useMemo, useReducer, useState } from "react";
import TodoList from "./TodoList";
import BottomNav from "./BottomNav";
import AppBar from "./TopAppBar";

// PUBLIC_INTERFACE
export default function TodoApp() {
  /** Root app for the Todo UI screen matching the extracted Figma layout */

  // Storage key compatible with provided assets
  const STORAGE_KEY = "todos-9-680";

  // Reducer for todos
  function todosReducer(state, action) {
    switch (action.type) {
      case "init":
        return Array.isArray(action.payload) ? action.payload : state;
      case "add": {
        const next = [
          {
            id: cryptoRandom(),
            title: (action.payload?.title || "TODO TITLE").trim().toUpperCase(),
            subtitle: (action.payload?.subtitle || "TODO SUB TITLE")
              .trim()
              .toUpperCase(),
            completed: false,
          },
          ...state,
        ];
        return next;
      }
      case "edit": {
        const { id, title, subtitle } = action.payload || {};
        return state.map((t) =>
          t.id === id
            ? {
                ...t,
                title: (title || t.title).trim().toUpperCase(),
                subtitle: (subtitle || t.subtitle).trim().toUpperCase(),
              }
            : t
        );
      }
      case "delete": {
        const id = action.payload;
        return state.filter((t) => t.id !== id);
      }
      case "toggle": {
        const id = action.payload;
        return state.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
      }
      default:
        return state;
    }
  }

  // Default seed data similar to assets/app.js
  const defaultTodos = useMemo(
    () => [
      { id: cryptoRandom(), title: "TODO TITLE", subtitle: "TODO SUB TITLE", completed: false },
      { id: cryptoRandom(), title: "TODO TITLE", subtitle: "TODO SUB TITLE", completed: false },
      { id: cryptoRandom(), title: "TODO TITLE", subtitle: "TODO SUB TITLE", completed: false },
      { id: cryptoRandom(), title: "TODO TITLE", subtitle: "TODO SUB TITLE", completed: false },
    ],
    []
  );

  const [todos, dispatch] = useReducer(todosReducer, defaultTodos);

  // UI state
  const [filter, setFilter] = useState("all"); // "all" | "completed"
  const [search, setSearch] = useState("");

  // Load from localStorage on boot
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          dispatch({ type: "init", payload: arr });
        }
      } else {
        // Seed localStorage from defaults
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTodos));
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // ignore persistence errors
    }
  }, [todos]);

  const visibleTodos = useMemo(() => {
    let items = todos;
    if (filter === "completed") {
      items = items.filter((t) => t.completed);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.subtitle.toLowerCase().includes(q)
      );
    }
    return items;
  }, [todos, filter, search]);

  // PUBLIC_INTERFACE
  function handleAdd() {
    const title = window.prompt("Enter TODO TITLE:") || "";
    if (title === null) return;
    const subtitle = window.prompt("Enter TODO SUB TITLE:") || "";
    dispatch({ type: "add", payload: { title, subtitle } });
  }

  // PUBLIC_INTERFACE
  function handleEdit(id) {
    const current = todos.find((t) => t.id === id);
    if (!current) return;
    const title = window.prompt("Edit TODO TITLE:", current.title) ?? current.title;
    const subtitle =
      window.prompt("Edit TODO SUB TITLE:", current.subtitle) ?? current.subtitle;
    dispatch({ type: "edit", payload: { id, title, subtitle } });
  }

  // PUBLIC_INTERFACE
  function handleDelete(id) {
    dispatch({ type: "delete", payload: id });
  }

  // PUBLIC_INTERFACE
  function handleToggle(id) {
    dispatch({ type: "toggle", payload: id });
  }

  // PUBLIC_INTERFACE
  function cryptoRandom() {
    /** Generate a simple random id string */
    return "t" + Math.random().toString(36).slice(2, 10);
  }

  return (
    <div className="app-canvas" data-screen-id="9:680">
      {/* Status bar placeholder */}
      <div className="status-bar" aria-hidden="true" />

      {/* App bar with title and calendar glyph */}
      <AppBar />

      {/* Search field placed visually under app bar to satisfy feature requirement without straying much from design */}
      <div
        style={{
          position: "absolute",
          top: 118 + 8, // app-bar (118) + spacing
          left: 7,
          width: 400,
          padding: "0 16px 8px 16px",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
        aria-label="Search todos container"
      >
        <input
          aria-label="Search todos"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            height: 36,
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.1)",
            padding: "0 12px",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Todo list area */}
      <main className="todos" role="main" aria-label="Todo items">
        <TodoList
          items={visibleTodos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </main>

      {/* Bottom nav for filters */}
      <BottomNav
        activeFilter={filter}
        onChange={(f) => setFilter(f)}
      />

      {/* Floating action button */}
      <button
        className="fab"
        id="fab-add"
        aria-label="Add new todo"
        title="Add new todo"
        onClick={handleAdd}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" />
        </svg>
      </button>
    </div>
  );
}
