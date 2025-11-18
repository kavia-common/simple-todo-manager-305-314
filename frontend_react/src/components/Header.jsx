import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header component for the Todo Manager app.
 */
function Header() {
  return (
    <header className="todo-header">
      <h1>Todo Manager</h1>
      <p className="todo-tagline">
        Manage your daily tasks simply. Powered by <span className="accent-primary">#3b82f6</span> and <span className="accent-success">#06b6d4</span>.
      </p>
    </header>
  );
}

export default Header;
