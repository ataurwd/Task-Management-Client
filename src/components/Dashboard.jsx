import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
         <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
        <header className="flex justify-between items-center py-4 px-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Task Management</h1>
          <nav className="space-x-4">
            <Link to="/add-task" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add Task
            </Link>
            <Link to="/all-tasks" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              All Tasks
            </Link>
          </nav>
        </header>
        
        <main className="mt-6 px-6">
          <h2 className="text-xl font-semibold text-gray-700">Welcome to your Task Dashboard</h2>
          <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dashboard Stats or Other Content */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600">Pending Tasks</h3>
              <p className="text-2xl font-semibold text-gray-800">5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600">In Review</h3>
              <p className="text-2xl font-semibold text-gray-800">2</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600">Completed Tasks</h3>
              <p className="text-2xl font-semibold text-gray-800">12</p>
            </div>
          </div>
        </main>
      </div>
    </div>
    );
};

export default Dashboard;