import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AIChat from './AIChat'; // <--- Import AI Chat

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <AIChat /> {/* <--- Add Widget Here */}
    </div>
  );
};

export default Layout;