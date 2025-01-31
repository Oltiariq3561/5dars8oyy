import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/TodoSlice";

const TodoInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div className="flex gap-3 bg-gray-100 p-4 rounded-lg">
      <input
        type="text"
        className="border p-2 flex-grow"
        placeholder="Enter new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-4  py-2 rounded-lg cursor-pointer">
        Add
      </button>
    </div>
  );
};

export default TodoInput;
