import { Route, Routes } from "react-router-dom";
import Registration from "../components/Registration";
import Home from "../components/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import AddTask from "../components/dashboard/AddTask";
import AllTask from "../components/dashboard/AllTask";

const Router = () => {
  return (
    <div>
      <Routes>
        {/* Protect the Home route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-tasks"
          element={
            <ProtectedRoute>
              <AllTask />
            </ProtectedRoute>
          }
        />

        {/* Route for the Login page */}
        <Route path="/" element={<Login />} />

        {/* Route for the Register page */}
        <Route path="/register" element={<Registration />} />

        {/* Optionally, you can add a catch-all route for 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default Router;
