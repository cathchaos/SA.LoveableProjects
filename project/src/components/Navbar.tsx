import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Wallet, FileText, Vote, LogOut, Bell, X, Calendar } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const notifications = [
    { id: 1, text: "New bill uploaded: March Common Expenses", time: "2h ago", unread: true },
    { id: 2, text: "Elevator maintenance completed", time: "5h ago", unread: true },
    { id: 3, text: "Voting for Facade Renovation is ending soon", time: "1d ago", unread: false },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-white/10 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">DIAXIRISI</span>
          </Link>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/finances" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition ${isActive('/finances')}`}>
                <Wallet className="h-4 w-4" />
                <span>Finances</span>
              </Link>
              
              <Link to="/documents" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition ${isActive('/documents')}`}>
                <FileText className="h-4 w-4" />
                <span>Docs</span>
              </Link>
              
              <Link to="/voting" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition ${isActive('/voting')}`}>
                <Vote className="h-4 w-4" />
                <span>Vote</span>
              </Link>

              {/* Added Amenities Link */}
              <Link to="/amenities" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition ${isActive('/amenities')}`}>
                <Calendar className="h-4 w-4" />
                <span>Amenities</span>
              </Link>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 rounded-full hover:bg-blue-700 transition relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-blue-600"></span>
              </button>

              {/* Notification Dropdown */}
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 text-gray-800 animate-slide-in">
                  <div className="flex justify-between items-center px-4 py-2 border-b">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <button onClick={() => setShowNotifs(false)}><X className="h-4 w-4 text-gray-400 hover:text-gray-600" /></button>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer ${n.unread ? 'bg-blue-50/50' : ''}`}>
                      <p className="text-sm font-medium text-gray-800">{n.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                    </div>
                  ))}
                  <div className="px-4 py-2 text-center border-t">
                    <button className="text-xs text-blue-600 font-medium hover:underline">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-blue-500 mx-2 hidden md:block"></div>

            <button 
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-600 transition bg-blue-800/50 text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;