import React, { useState, useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * TodoInput component for adding or editing todos, single-line input.
 *
 * Props:
 * - onAdd: function(text) to add new todo (add mode)
 * - onSave: function(text) to save edit (edit mode)
 * - onCancel: function() if canceling edit (edit mode)
 * - initialValue: string (optional, for edit mode)
 * - isEditing: boolean (if editing mode)
 * - maxLength: number (optional, char limit for counter)
 *
 * UX/Accessibility:
 * - Enter triggers add/save. Shift+Enter is ignored.
 * - Input visually single-line (no Shift+Enter newline).
 * - Left accent border (#3b82f6), glows on focus, #06b6d4 (success) on add/save.
 * - Clear (x) button appears when input non-empty.
 * - Add/Save button disabled if trimmed input is empty.
 * - Proper aria-label, id, form structure, and visible (subtle) label.
 * - Character counter appears if maxLength prop set.
 * - No backend dependency, local state only.
 */
function TodoInput({
  onAdd,
  onSave,
  onCancel,
  initialValue = "",
  isEditing = false,
  maxLength
}) {
  const [input, setInput] = useState(initialValue);
  const [confirmed, setConfirmed] = useState(false);
  const inputRef = useRef(null);

  // Focus and reset on mode/incoming value change
  useEffect(() => {
    setInput(initialValue);
    setConfirmed(false);
    if (inputRef.current) inputRef.current.focus();
  }, [isEditing, initialValue]);

  // For confirmation accent
  useEffect(() => {
    let t;
    if (confirmed) {
      t = setTimeout(() => setConfirmed(false), 650);
    }
    return () => t && clearTimeout(t);
  }, [confirmed]);

  const isEmpty = input.trim().length === 0;

  // Handle input change
  const handleChange = (e) => {
    let val = e.target.value;
    // if maxLength provided, trim (redundant, input already enforces, but for safety)
    if (typeof maxLength === "number" && val.length > maxLength) {
      val = val.slice(0, maxLength);
    }
    setInput(val);
  };

  // Enter submits; Shift+Enter does nothing (no newline)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Only submit if focused on input, not when disabled
      e.preventDefault();
      if (isEmpty) return;
      triggerSubmit();
    } else if (e.key === "Enter" && e.shiftKey) {
      // Prevent adding newline
      e.preventDefault();
    } else if (e.key === "Escape" && isEditing && onCancel) {
      onCancel();
    }
  };

  // Core submit logic
  const triggerSubmit = () => {
    const text = input.trim();
    if (!text) return;
    if (isEditing && onSave) {
      onSave(text);
    } else if (!isEditing && onAdd) {
      onAdd(text);
    }
    setConfirmed(true);
    setInput(""); // For add mode, clear; for edit, clear (parent resets via initialValue)
  };

  // For clear (x) button
  const handleClear = () => {
    setInput("");
    inputRef.current && inputRef.current.focus();
  };

  // For Cancel button (edit mode)
  const handleCancel = (e) => {
    e.preventDefault();
    if (onCancel) onCancel();
  };

  // For live character count
  const charCount = typeof maxLength === "number" ? input.length : null;

  // Accessibility id for label/input
  const inputId = isEditing ? "todo-edit-input" : "todo-add-input";
  const labelText = isEditing ? "Edit todo" : "Add todo";

  return (
    <form
      className="todo-input-form accent-form"
      onSubmit={e => { e.preventDefault(); if (!isEmpty) triggerSubmit(); }}
      role="form"
      aria-label={isEditing ? "Edit todo form" : "Add todo form"}
      autoComplete="off"
    >
      <div className={`accent-input-wrapper${confirmed ? " accent-confirmed" : ""}`}>
        <label
          htmlFor={inputId}
          className="visually-subtle"
          aria-label={labelText}
        >
          {labelText}
        </label>
        <input
          ref={inputRef}
          className="todo-input"
          id={inputId}
          type="text"
          inputMode="text"
          autoComplete="off"
          aria-label={labelText}
          aria-describedby={maxLength ? (inputId + "_counter") : undefined}
          placeholder={isEditing ? "Edit todo…" : "Add a new todo…"}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={maxLength || 80}
          spellCheck="false"
        />
        {/* Clear button (x) when not empty */}
        {!isEmpty && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={0}
            title="Clear"
          >
            ×
          </button>
        )}
      </div>
      {/* Controls section */}
      <div className="todo-input-controls">
        <button
          type="submit"
          className="btn btn-primary"
          aria-label={isEditing ? "Save" : "Add"}
          disabled={isEmpty}
        >
          {isEditing ? "Save" : "Add"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            aria-label="Cancel"
          >
            Cancel
          </button>
        )}
        {/* Optional char counter */}
        {typeof maxLength === "number" && (
          <span
            className={`char-counter${charCount >= maxLength ? " char-counter-max" : ""}`}
            id={inputId + "_counter"}
            aria-live="polite"
          >
            {charCount} / {maxLength}
          </span>
        )}
      </div>
      {/* Inline accent/focus styling */}
      <style>{`
        .accent-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          border-left: 4px solid var(--primary, #3b82f6);
          border-radius: calc(var(--radius, 8px) * 0.85);
          background: #f1f5f9;
          transition: border-color 0.19s, box-shadow 0.19s;
          box-shadow: 0 0 0 0 #3b82f655;
        }
        .accent-input-wrapper:focus-within {
          border-left-color: var(--primary, #3b82f6);
          box-shadow: 0 0 0 2px #3b82f644;
        }
        .accent-input-wrapper.accent-confirmed {
          border-left-color: var(--success, #06b6d4);
          box-shadow: 0 0 0 2px #06b6d488;
          animation: accent-confirm-glow 0.65s;
        }
        @keyframes accent-confirm-glow {
          0% { box-shadow: 0 0 0 2px #06b6d488; }
          80% { box-shadow: 0 0 0 7px #06b6d420; }
          100% { box-shadow: 0 0 0 0 #06b6d400;}
        }
        .visually-subtle {
          position: absolute;
          left: -9999px;
          opacity: 0;
          pointer-events: none;
        }
        .clear-btn {
          position: absolute;
          right: 0.75em;
          background: none;
          border: none;
          color: var(--secondary, #64748b);
          font-size: 1.1em;
          font-weight: bold;
          cursor: pointer;
          border-radius: 0.3em;
          padding: 0 0.35em;
          height: 1.7em;
          line-height: 1em;
          opacity: 0.75;
          transition: opacity 0.18s;
        }
        .clear-btn:hover, .clear-btn:focus {
          color: var(--primary, #3b82f6);
          background: #e0e7ef;
          opacity: 1;
        }
        .todo-input {
          width: 100%;
          padding-right: 2.4em;
          border: none;
          outline: none;
          background: transparent;
        }
        .todo-input-controls {
          display: flex;
          align-items: center;
          gap: 0.42rem;
          margin-left: 0.2em;
          margin-top: 0.06em;
        }
        .char-counter {
          font-size: 0.94em;
          color: var(--secondary, #64748b);
          margin-left: 0.36em;
        }
        .char-counter-max {
          color: var(--primary, #3b82f6);
          font-weight: 500;
        }
        /* Hide form native browser validation tools/quirks */
        .accent-form input::-webkit-input-placeholder { color: #96aac880; }
        .accent-form input::-moz-placeholder { color: #96aac880; }
        .accent-form input:-ms-input-placeholder { color: #96aac880; }
        .accent-form input::placeholder { color: #96aac880; }
      `}</style>
    </form>
  );
}

export default TodoInput;
