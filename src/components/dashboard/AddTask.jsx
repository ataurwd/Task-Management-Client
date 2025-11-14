import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const AddTask = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.elements.taskTitle.value;
    const description = e.target.elements.description.value;
    const status = e.target.elements.status.value;
    const userEmail = Cookies.get("email");
    const formData = {
      title,
      description,
      status,
      userEmail, // Include email in the task data
    };
    console.log(formData);

    // Send data to the server useing axios
    fetch("https://server-roan-delta.vercel.app/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <header className="py-4 px-6 border-b">
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
        </header>

        <main className="mt-6 px-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="taskName" className="block text-gray-600">
                Task Name
              </label>
              <input
                id="taskName"
                name="taskTitle"
                type="text"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-600">
                Status
              </label>
              <select
                name="status"
                id="status"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="review">Review</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Task
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddTask;
