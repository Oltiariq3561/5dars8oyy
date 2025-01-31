import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, updateUser, deleteUser } from "../store/userSlice";
import { RootState } from "../store/Store";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state: RootState) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (name && email) {
      dispatch(addUser({ name, email }));
      setName("");
      setEmail("");
    }
  };

  const handleUpdateUser = (id: number) => {
    if (name && email) {
      dispatch(updateUser({ id, name, email }));
      setEditingUser(null);
      setName("");
      setEmail("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">2-Vazifa</h1>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        {editingUser ? (
          <button
            onClick={() => handleUpdateUser(editingUser)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        )}
      </div>

      {status === "loading" && <p>Loading users...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}

      <ul className="bg-white p-4 rounded shadow">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between p-2 border-b last:border-0"
          >
            <span>{user.name} ({user.email})</span>
            <div>
              <button
                onClick={() => {
                  setEditingUser(user.id);
                  setName(user.name);
                  setEmail(user.email);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteUser(user.id))}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
