import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch users data from the API
      const response = await axios.get(
        "https://server-roan-delta.vercel.app/users"
      );
      const users = response.data;

      // Check if there's a user that matches the entered email and password
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Save user data in cookies (you can store specific data like email, name, etc.)
        Cookies.set("user", JSON.stringify(user), { expires: 7 }); // The cookie will expire in 7 days
        Cookies.set("email", email, { expires: 7 }); // Store email separately

        // Redirect to home page if the user is found
        navigate("/add-task"); // Change '/home' to your desired route
      } else {
        // Show error if credentials do not match
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full p-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex justify-center space-x-2 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <a
            href="/register"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
