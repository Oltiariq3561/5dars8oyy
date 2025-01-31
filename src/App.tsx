import { Provider } from "react-redux";
import { store } from "./store/store";
import TodoList from "./components/TodoList.tsx";
import TodoInput from "./components/TodoInput.tsx";
import UserList from "./components/UserList.tsx";
const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-6">1-Vazifa Todo List</h1>
        <TodoInput />
        <TodoList />
      </div>
      <UserList></UserList>
    </Provider>
  );
};
export default App;
