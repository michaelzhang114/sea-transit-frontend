import React, { useState, useEffect } from "react";
import axios from "axios";

function UserForm() {
  const [route_num, setRouteNum] = useState("");
  const [stop_num, setStopNum] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    // Fetch users from API endpoint
    axios
      .get("https://seattle-bus-whisperer.onrender.com/api/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (route_num && stop_num && selectedUser) {
      axios
        .post("https://seattle-bus-whisperer.onrender.com/api/route", {
          route_num: route_num,
          stop_num: stop_num,
          user_id: selectedUser,
        })
        .then((response) => {
          console.log("Route created:", response.data);
          setRouteNum("");
          setStopNum("");
          setSelectedUser("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Create Route</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Route ID"
          value={route_num}
          onChange={(e) => setRouteNum(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stop ID"
          value={stop_num}
          onChange={(e) => setStopNum(e.target.value)}
        />
        <div>
          <label htmlFor="userDropdown">Select a User:</label>
          <select
            id="userDropdown"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default UserForm;
