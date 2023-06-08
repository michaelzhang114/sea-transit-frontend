// RouteList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [editingRouteId, setEditingRouteId] = useState(null);
  const [updatedRoute, setUpdatedRoute] = useState({
    route_num: "",
    stop_num: "",
    user_name: "",
    user_email: "",
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(
        "https://seattle-bus-whisperer.onrender.com/api/route"
      );
      setRoutes(response.data.routes);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const deleteRoute = async (id) => {
    try {
      await axios.delete(
        `https://seattle-bus-whisperer.onrender.com/api/route/${id}`
      );
      fetchRoutes();
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  const startEditingRoute = (route) => {
    setEditingRouteId(route.id);
    setUpdatedRoute({
      route_num: route.route_num,
      stop_num: route.stop_num,
      user_name: route.user_name,
      user_email: route.user_email,
    });
  };

  const cancelEditingRoute = () => {
    setEditingRouteId(null);
    setUpdatedRoute({
      route_num: "",
      stop_num: "",
      user_name: "",
      user_email: "",
    });
  };

  const updateField = (e) => {
    setUpdatedRoute({
      ...updatedRoute,
      [e.target.route_num]: e.target.value,
    });
  };

  const updateRoute = async (id) => {
    try {
      await axios.put(
        `https://seattle-bus-whisperer.onrender.com/api/route/${id}`,
        updatedRoute
      );
      fetchRoutes();
      setEditingRouteId(null);
      setUpdatedRoute({
        route_num: "",
        stop_num: "",
        user_name: "",
        user_email: "",
      });
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  return (
    <div>
      <h2>Route List</h2>
      <table>
        <thead>
          <tr>
            <th>Route ID</th>
            <th>Stop ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td>
                {editingRouteId === route.id ? (
                  <input
                    type="text"
                    name="route_num"
                    value={updatedRoute.route_num}
                    onChange={updateField}
                  />
                ) : (
                  route.route_num
                )}
              </td>
              <td>
                {editingRouteId === route.id ? (
                  <input
                    type="text"
                    name="stop_num"
                    value={updatedRoute.stop_num}
                    onChange={updateField}
                  />
                ) : (
                  route.stop_num
                )}
              </td>
              <td>
                {editingRouteId === route.id ? (
                  <input
                    type="text"
                    name="user_name"
                    value={updatedRoute.user_name}
                    onChange={updateField}
                  />
                ) : (
                  route.user_name
                )}
              </td>
              <td>
                {editingRouteId === route.id ? (
                  <input
                    type="text"
                    name="user_email"
                    value={updatedRoute.user_email}
                    onChange={updateField}
                  />
                ) : (
                  route.user_email
                )}
              </td>
              <td>
                {editingRouteId === route.id ? (
                  <>
                    <button onClick={() => updateRoute(route.id)}>Save</button>
                    <span style={{ margin: "0 10px" }}></span>
                    <button onClick={cancelEditingRoute}>Cancel</button>
                  </>
                ) : (
                  <>
                    {/* <button onClick={() => startEditingRoute(route)}>
                      Edit
                    </button> */}
                    <span style={{ margin: "0 10px" }}></span>
                    <button onClick={() => deleteRoute(route.id)}>
                      Delete
                    </button>
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

export default RouteList;
