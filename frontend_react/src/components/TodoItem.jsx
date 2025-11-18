import React, { useState } from "react";
import TodoInput from "./TodoInput";

/**
 * PUBLIC_INTERFACE
 * TodoItem component for rendering and interacting with a single todo.
 * Props:
 * - todo: { id, text, completed }
 * - onToggle: function(id) for toggle complete
 * - onDelete: function(id) for deleting
 * - onEdit: function(id, newText) for updating
 */
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);

  return (
    <li className={`todo-item${todo.completed ? " completed" : ""}`}>
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
        />
        {editing ? (
          <TodoInput
            isEditing
            initialText={todo.text}
            onSave={(text) => {
              onEdit(todo.id, text);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <span
            className="todo-text"
            onDoubleClick={() => setEditing(true)}
            tabIndex={0}
            aria-label={`Todo: ${todo.text}`}
            title="Double-click or use Edit to edit"
            style={{ textDecoration: todo.completed ? "line-through" : undefined }}
          >
            {todo.text}
          </span>
        )}
      </div>
      {!editing && (
        <div className="todo-actions">
          <button
            className="action-btn edit"
            onClick={() => setEditing(true)}
            aria-label="Edit"
          >Edit</button>
          <button
            className="action-btn delete"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete"
          >Delete</button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
