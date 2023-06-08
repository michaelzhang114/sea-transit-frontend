import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email) {
      // Create a new user using the API endpoint
      axios
        .post("https://seattle-bus-whisperer.onrender.com/api/user", {
          name: name,
          email: email,
        })
        .then((response) => {
          console.log("User created:", response.data);
          setName("");
          setEmail("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default UserForm;
