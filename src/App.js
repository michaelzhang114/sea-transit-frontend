import React from "react";
import UserList from "./Components/UserList";
import UserForm from "./Components/UserForm";
import RouteList from "./Components/RouteList";
import RouteForm from "./Components/RouteForm";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";

// function App() {
//   return (
//     <div className="container">
//       <h1>CRUD App</h1>
//       <UserForm />
//       <UserList />
//     </div>
//   );
// }

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/routes">Routes</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            exact
            path="/users"
            element={
              <div className="container">
                <UserForm />
                <UserList />
              </div>
            }
          />
          <Route
            path="/routes"
            element={
              <div className="container">
                <RouteForm />
                <RouteList />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
