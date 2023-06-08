// UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://seattle-bus-whisperer.onrender.com/api/user"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://seattle-bus-whisperer.onrender.com/api/user/${id}`
      );
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const startEditingUser = (user) => {
    setEditingUserId(user.id);
    setUpdatedUser({ name: user.name, email: user.email });
  };

  const cancelEditingUser = () => {
    setEditingUserId(null);
    setUpdatedUser({ name: "", email: "" });
  };

  const updateField = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async (id) => {
    try {
      await axios.put(
        `https://seattle-bus-whisperer.onrender.com/api/user/${id}`,
        updatedUser
      );
      fetchUsers();
      setEditingUserId(null);
      setUpdatedUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedUser.name}
                    onChange={updateField}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={updatedUser.email}
                    onChange={updateField}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button onClick={() => updateUser(user.id)}>Save</button>
                    <span style={{ margin: "0 10px" }}></span>
                    <button onClick={cancelEditingUser}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditingUser(user)}>Edit</button>
                    <span style={{ margin: "0 10px" }}></span>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
