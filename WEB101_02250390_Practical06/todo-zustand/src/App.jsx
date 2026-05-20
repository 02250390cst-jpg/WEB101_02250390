import { useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand Store
const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],

      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              text,
              completed: false,
            },
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);

function App() {
  const [text, setText] = useState("");

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const clearCompleted = useTodoStore(
    (state) => state.clearCompleted
  );

  const handleAdd = () => {
    if (text.trim() === "") return;

    addTodo(text);
    setText("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Todo List with Zustand</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "250px",
          }}
        />

        <button onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ marginBottom: "10px" }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => removeTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={clearCompleted}
        style={{ marginTop: "20px" }}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default App;