import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

/*
  Color tokens: #3b82f6 (primary), #06b6d4 (success), #64748b (secondary), hsl(0 84% 60%) (error)
  Storage key migration: v1
*/
const STORAGE_KEY_OLD = "todos_v1"; // legacy key
const STORAGE_KEY = "todo_manager.todos.v1"; // namespaced, clear v1 key

/**
 * Load todos from localStorage, migrating if necessary.
 * Reads from STORAGE_KEY.
 * If nothing under new key, but old key exists, migrates old to new and removes old key.
 * @returns {Array} List of todos
 */
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {}

  try {
    const rawOld = localStorage.getItem(STORAGE_KEY_OLD);
    if (rawOld) {
      localStorage.setItem(STORAGE_KEY, rawOld);
      localStorage.removeItem(STORAGE_KEY_OLD);
      return JSON.parse(rawOld);
    }
  } catch (err) {}
  return [];
}

/**
 * Save all todos to localStorage (always uses new key).
 * @param {Array} todos
 */
function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function App() {
  const [todos, setTodos] = useState(() => loadTodos());
  const [theme] = useState("light"); // fixed light theme: #3b82f6/#06b6d4 accents

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text) => {
    const next = [
      ...todos,
      { id: Date.now(), text, completed: false }
    ];
    setTodos(next);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map(t =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  return (
    <div className="App todo-app-root">
      <Header />
      <main className="todo-main">
        <TodoInput onAdd={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </main>
      <footer className="todo-footer">
        <span>
          &copy; {new Date().getFullYear()} Todo Manager &ndash; All changes are saved locally.
        </span>
      </footer>
    </div>
  );
}

// Only default export required by React entry. Nothing else is exported or assigned globally.
export default App;
