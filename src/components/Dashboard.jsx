import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserTasks = async () => {
      const email = Cookies.get("email");

      if (!email) {
        setError("User not logged in");
        return;
      }

      try {
        const res = await axios.get(`https://radiant-strudel-c136a6.netlify.app/tasks/${email}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching dashboard tasks:", err);
        setError("Failed to load tasks");
      }
    };

    fetchUserTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
        <header className="flex justify-between items-center py-4 px-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">
            Task Management
          </h1>
          <nav className="space-x-4">
            <Link
              to="/add-task"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Task
            </Link>
            <Link
              to="/all-tasks"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              All Tasks
            </Link>
          </nav>
        </header>

        <main className="mt-6 px-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Recent Tasks
          </h2>

          {error && <p className="text-red-500">{error}</p>}

          {tasks.length === 0 ? (
            <p className="text-gray-600">You have no tasks yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-5 rounded-md shadow-md hover:shadow-lg transition duration-300 border"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Status:{" "}
                    <span className="font-semibold capitalize">
                      {task.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
