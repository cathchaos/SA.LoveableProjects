import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Building2, ShieldCheck, User, Lock, AlertCircle } from "lucide-react";

const LoginForm: React.FC = () => {
  const [building, setBuilding] = useState("Building 1");
  const [apartment, setApartment] = useState("101");
  const [password, setPassword] = useState(""); // <--- Password State
  const [role, setRole] = useState<'admin' | 'resident'>('resident');
  const [error, setError] = useState(""); 
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const buildings = ["Building 1", "Building 2", "Building 3"];
  const apartments = {
    "Building 1": ["101", "102", "103", "201", "202"],
    "Building 2": ["A1", "A2", "B1", "B2"],
    "Building 3": ["Penthouse", "1A", "1B"],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // --- SECURITY CHECK ---
    
    // 1. Admin Validation (Master Password)
    if (role === 'admin') {
      if (password !== "MASTER123") {
        setError("Invalid Master Password. Access Denied.");
        return;
      }
    }

    // 2. Resident Validation (Simulated Personal Password)
    if (role === 'resident') {
      // For the pitch, we accept '1234' for any resident
      if (password !== "1234") {
        setError("Invalid Password. Please try again.");
        return;
      }
    }

    // --- SUCCESS ---
    const mockName = role === 'admin' ? 'Building Admin' : `Resident ${apartment}`;
    login(mockName, building, apartment, role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full animate-fade-in">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-blue-200 shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome to Diaxirisi</h2>
          <p className="text-gray-500 text-sm mt-2">Smart Building Management System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center animate-slide-in">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}

          {/* Role Toggle */}
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              type="button"
              onClick={() => { setRole('resident'); setError(''); setPassword(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${
                role === 'resident' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={16} /> Resident
            </button>
            <button
              type="button"
              onClick={() => { setRole('admin'); setError(''); setPassword(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${
                role === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShieldCheck size={16} /> Admin
            </button>
          </div>

          {/* Building Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Building</label>
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {buildings.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Identity Input (Apt or Admin ID) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === 'admin' ? 'Admin ID' : 'Apartment Unit'}
            </label>
            {role === 'resident' ? (
              <select
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                {apartments[building as keyof typeof apartments]?.map((apt) => (
                  <option key={apt} value={apt}>{apt}</option>
                ))}
              </select>
            ) : (
              <input 
                value="ADM-2024"
                disabled
                className="w-full border border-gray-200 p-2.5 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            )}
          </div>

          {/* Password Input (New Feature) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === 'admin' ? 'Master Password' : 'Account Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={role === 'admin' ? "Enter Master Key..." : "Enter Password..."}
                className="w-full border border-gray-200 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            {/* Helper text for the Demo */}
            <p className="text-xs text-gray-400 mt-1 text-right">
              {role === 'admin' ? '(Hint: MASTER123)' : '(Hint: 1234)'}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-100 flex justify-center items-center gap-2"
            >
              Enter Portal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;