import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const { taskId } = useParams(); // Get taskId from URL params
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch task details from the backend using the taskId
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `https://server-roan-delta.vercel.app/tasks/${taskId}`
        );
        setTask(response.data); // Set task data in the state
      } catch (error) {
        console.error("Error fetching task:", error);
        setError("Failed to load task");
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send updated task data to the backend
      const response = await axios.put(
        `https://server-roan-delta.vercel.app/tasks/${taskId}`,
        task
      );
      if (response.status === 200) {
        // Redirect to the task list page after successful edit
        navigate("/all-tasks");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
        <header className="py-4 px-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Edit Task</h1>
        </header>

        <main className="mt-6 px-6">
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message if there's an issue */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                value={task.status}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="review">Review</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Update Task
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditTask;
