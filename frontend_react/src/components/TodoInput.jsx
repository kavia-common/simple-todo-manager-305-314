import React, { useState, useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * TodoInput component for adding or editing todos.
 * Props:
 * - onAdd: function(text) when adding new todo
 * - onSave: function(text) when saving edit, only if editing
 * - onCancel: function() when cancelling edit, only if editing
 * - initialText: string (optional, for edit mode)
 * - isEditing: boolean (true if editing mode)
 */
function TodoInput({ onAdd, onSave, onCancel, initialText = "", isEditing = false }) {
  const [input, setInput] = useState(initialText);
  const inputRef = useRef(null);

  useEffect(() => {
    setInput(initialText);
    if (inputRef.current) inputRef.current.focus();
  }, [isEditing, initialText]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    if (isEditing && onSave) onSave(text);
    else if (!isEditing && onAdd) onAdd(text);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isEditing && onCancel) {
      onCancel();
    }
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="todo-input"
        type="text"
        placeholder={isEditing ? "Edit todo..." : "Add a new todo..."}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-label={isEditing ? "Edit todo" : "Add new todo"}
        maxLength={80}
      />
      {isEditing ? (
        <>
          <button
            type="submit"
            className="btn btn-primary"
            aria-label="Save edit"
          >Save</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            aria-label="Cancel edit"
          >Cancel</button>
        </>
      ) : (
        <button
          type="submit"
          className="btn btn-primary"
          aria-label="Add todo"
        >Add</button>
      )}
    </form>
  );
}

export default TodoInput;
