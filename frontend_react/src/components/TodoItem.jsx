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
 * - playfulCopy: (optional, default true) — enables engaging microcopy and enhanced tips if true, else uses neutral copy
 */
function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  playfulCopy = true // Opt-in for playful microcopy by default
}) {
  const [editing, setEditing] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Detect edge case: completely empty/whitespace text
  const isEmptyText =
    typeof todo.text !== "string" || todo.text.trim().length === 0;

  // Labels/tips based on playfulCopy
  const copy = playfulCopy
    ? {
        completeAria: todo.completed
          ? "Mark incomplete (bring it back!)"
          : "Mark complete (you got this!)",
        editAria: "Edit this task (give it a glow up)",
        deleteAria: "Delete this task (poof!)",
        editBtn: "Edit",
        deleteBtn: "Delete",
        completedCaption: "Nice! Checked off.",
        emptyText: "(mystery task)",
        emptyTextClass: "muted-placeholder",
        hoverTip: "Tip: Double-check before you delete."
      }
    : {
        completeAria: todo.completed ? "Mark incomplete" : "Mark complete",
        editAria: "Edit this task",
        deleteAria: "Delete this task",
        editBtn: "Edit",
        deleteBtn: "Delete",
        completedCaption: "",
        emptyText: "(no description)",
        emptyTextClass: "muted-placeholder",
        hoverTip: ""
      };

  return (
    <li
      className={`todo-item${todo.completed ? " completed" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="todo-left">
        {/* Accessible complete checkbox with playful aria-label */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={copy.completeAria}
          title={copy.completeAria}
        />

        {editing ? (
          <TodoInput
            isEditing
            initialValue={todo.text}
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
            aria-label={
              isEmptyText
                ? "Todo: empty"
                : `Todo: ${todo.text}`
            }
            title="Double-click or use Edit to edit"
            style={{ textDecoration: todo.completed ? "line-through" : undefined }}
          >
            {/* Show either the todo text, or if absent, a muted placeholder */}
            {isEmptyText ? (
              <span className={copy.emptyTextClass}>{copy.emptyText}</span>
            ) : (
              todo.text
            )}
            {/* Engaging caption if completed */}
            {todo.completed && copy.completedCaption && (
              <span className="completed-caption accent-success">
                {" "}
                {copy.completedCaption}
              </span>
            )}
          </span>
        )}
      </div>

      {/* Action buttons (edit/delete), only if not editing */}
      {!editing && (
        <div className="todo-actions">
          <button
            className="action-btn edit"
            onClick={() => setEditing(true)}
            aria-label={copy.editAria}
            title={copy.editAria}
            tabIndex={0}
            type="button"
          >
            {copy.editBtn}
          </button>
          <button
            className="action-btn delete"
            onClick={() => onDelete(todo.id)}
            aria-label={copy.deleteAria}
            title={copy.deleteAria}
            tabIndex={0}
            type="button"
          >
            {copy.deleteBtn}
          </button>
        </div>
      )}

      {/* Tiny helper tip below item on hover (not in edit mode, only if copy.hoverTip is present) */}
      {!editing && hovered && copy.hoverTip && (
        <div className="todo-helper-tip">{copy.hoverTip}</div>
      )}

      {/* Inline minimal CSS for new features, using only tokens present in styles.css */}
      <style>{`
        .completed-caption {
          font-size: 0.93em;
          margin-left: 0.35em;
          opacity: 0.82;
          font-weight: 500;
          color: var(--success, #06b6d4);
          vertical-align: middle;
          background: none;
        }
        .muted-placeholder {
          color: var(--secondary, #64748b);
          font-style: italic;
          opacity: 0.60;
          letter-spacing: .01em;
          font-family: inherit;
        }
        .todo-helper-tip {
          position: absolute;
          left: 1.65em;
          bottom: -1.15em;
          font-size: 0.78em;
          color: var(--secondary, #64748b);
          background: none;
          opacity: 0.88;
          pointer-events: none;
          z-index: 1;
          user-select: none;
          white-space: pre;
        }
        /* Parent li must be relative for tip offset */
        .todo-item { position: relative; }
      `}</style>
    </li>
  );
}

export default TodoItem;
