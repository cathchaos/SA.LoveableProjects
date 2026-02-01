// src/components/LoginForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [building, setBuilding] = useState("");
  const [apartment, setApartment] = useState("");
  const [password, setPassword] = useState("");

  // For programmatic navigation after login
  const navigate = useNavigate();

  // Example building/apartment data
  const buildings = ["Building 1", "Building 2", "Building 3"];
  const apartments = {
    "Building 1": ["Apt 101", "Apt 102", "Apt 103"],
    "Building 2": ["Apt 201", "Apt 202"],
    "Building 3": ["Apt 301", "Apt 302", "Apt 303"],
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (building && apartment && password) {
      // In a real app, you'd check credentials here or call an API
      console.log(`Logging in: ${building}, ${apartment}, (password hidden)`);
      // Redirect to the main page (Dashboard) after “successful” login
      navigate("/dashboard");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Building Dropdown */}
          <div>
            <label htmlFor="building" className="block mb-1 font-medium">
              Building Name
            </label>
            <select
              id="building"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select a Building</option>
              {buildings.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Apartment Dropdown */}
          <div>
            <label htmlFor="apartment" className="block mb-1 font-medium">
              Apartment Number
            </label>
            <select
              id="apartment"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              disabled={!building}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select an Apartment</option>
              {building &&
                apartments[building].map((apt) => (
                  <option key={apt} value={apt}>
                    {apt}
                  </option>
                ))}
            </select>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
