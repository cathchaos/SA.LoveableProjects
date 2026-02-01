import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Finances from "./components/Finances";
import Documents from "./components/Documents";
import Voting from "./components/Voting";
import Support from "./components/Support";
import Maintenance from "./components/Maintenance";
import Amenities from "./components/Amenities"; // <--- Import Amenities
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginForm />} />

          {/* Protected Routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/support" element={<Support />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/amenities" element={<Amenities />} /> {/* <--- Add Route */}
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;