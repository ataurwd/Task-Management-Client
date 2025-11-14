import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // To get the email from cookies
import axios from "axios";
import { Link } from "react-router-dom";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const userEmail = Cookies.get("email"); // Get the email from cookies

      if (userEmail) {
        try {
          // Fetch tasks from the backend using the user's email
          const response = await axios.get(
            `http://localhost:5000/tasks/${userEmail}`
          );
          setTasks(response.data); // Set the fetched tasks
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setError("Failed to load tasks");
        }
      } else {
        setError("User not logged in");
      }
    };

    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  // Function to handle delete task
  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      if (response.status === 200) {
        // Remove deleted task from the state
        setTasks(tasks.filter(task => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    }
  };


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
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message if there's an issue */}
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-6 rounded-md shadow-md hover:shadow-xl transition duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-700">
                    {task.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Status: <span className="font-semibold">{task.status}</span>
                  </p>

                  <div className="flex space-x-4 mt-4">
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No tasks available.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllTasks;
