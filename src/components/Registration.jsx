import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

const Registration = () => {
  const navigate = useNavigate();

  // Handle the registration form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get all form data
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements["confirm-password"].value;

    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = { email, password };
    console.log(formData);

    try {
      // Send data to the server using fetch (or axios if preferred)
      const response = await fetch(
        "https://server-roan-delta.vercel.app/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Store the user's email in session cookie upon successful registration
        Cookies.set("email", email, { expires: 1 / 24 }); // Session cookie (expires in 1 hour)

        // Redirect to login page after successful registration
        navigate("/");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }

    // Reset the form
    e.target.reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

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
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Register
          </button>
        </form>

        <div className="flex justify-center space-x-2 text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <a
            href="/login"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Registration;
