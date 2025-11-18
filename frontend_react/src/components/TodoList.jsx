import React from "react";
import TodoItem from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * TodoList component to render all todos in a list.
 * Props:
 * - todos: array of { id, text, completed }
 * - onToggle, onDelete, onEdit: functions passed to each TodoItem
 */
function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length) {
    return <div className="todo-empty">No todos yet. Add your first todo!</div>;
  }
  return (
    <ul className="todo-list">
      {todos.map((todo) =>
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </ul>
  );
}

export default TodoList;
