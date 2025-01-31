import { useDispatch, useSelector } from "react-redux";
import { toggleTodo, deleteTodo, setFilter } from "../store/TodoSlice";
import { RootState } from "../store/Store";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state: RootState) => state.todos);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex gap-3 mb-4">
        <button onClick={() => dispatch(setFilter("all"))} className="btn cursor-pointer">
          All
        </button>
        <button onClick={() => dispatch(setFilter("completed"))} className="btn cursor-pointer">
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))} className="text-red-500">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
