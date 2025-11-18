import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

// Color tokens: #3b82f6 (primary), #06b6d4 (success), #64748b (secondary), hsl(0 84% 60%) (error)
const STORAGE_KEY = "todos_v1";

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// PUBLIC_INTERFACE
function App() {
  const [todos, setTodos] = useState(() => loadTodos());
  const [theme] = useState("light"); // fixed light theme: #3b82f6/#06b6d4 accents

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // PUBLIC_INTERFACE
  const addTodo = (text) => {
    const next = [
      ...todos,
      { id: Date.now(), text, completed: false }
    ];
    setTodos(next);
  };

  // PUBLIC_INTERFACE
  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  // PUBLIC_INTERFACE
  const toggleTodo = (id) => {
    setTodos(
      todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // PUBLIC_INTERFACE
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

export default App;
