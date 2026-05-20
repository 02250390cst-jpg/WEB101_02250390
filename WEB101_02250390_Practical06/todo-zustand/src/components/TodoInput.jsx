import { useState } from "react";
import useTodoStore from "../store/todoStore";

function TodoInput() {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAdd = () => {
    if (text.trim() === "") return;

    addTodo(text);
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TodoInput;