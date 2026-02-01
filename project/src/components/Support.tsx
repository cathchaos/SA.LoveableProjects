import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, AlertTriangle, Wrench, Phone, ArrowLeft, Star } from 'lucide-react';

const Support = () => {
  const suppliers = [
    { role: "Emergency Plumber", name: "Mario Bros Plumbing", phone: "+357 99 123456", rating: "4.9" },
    { role: "Electrician", name: "Sparky Services", phone: "+357 99 987654", rating: "4.8" },
    { role: "Locksmith", name: "SafeKeepers 24/7", phone: "+357 99 555555", rating: "5.0" },
    { role: "Elevator Tech", name: "LiftMasters", phone: "+357 22 111222", rating: "4.7" },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-2 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Portal
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Support Center</h1>
        <p className="text-gray-500 mt-1">Get help and find trusted contacts</p>
      </div>

      {/* Main Contact Channels */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg"><MessageSquare className="h-6 w-6 text-blue-600" /></div>
            <h2 className="text-xl font-semibold text-gray-800">General Inquiries</h2>
          </div>
          <p className="text-gray-600 mb-4">For non-urgent matters, billing questions, or feedback.</p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <span className="mr-3">📧</span> diaxirisi.eu@outlook.com
            </li>
            <li className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <span className="mr-3">📱</span> WhatsApp: +357 95 969491
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500 rounded-bl-full -mr-12 -mt-12 opacity-10"></div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-100 p-2 rounded-lg"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
            <h2 className="text-xl font-semibold text-gray-800">Emergency</h2>
          </div>
          <p className="text-gray-600 mb-4">For urgent issues (Water leaks, Electrical danger, Security).</p>
          <a href="tel:+35799000000" className="block w-full bg-red-600 text-white text-center py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg shadow-red-200">
            Call Emergency Line
          </a>
        </div>
      </div>

      {/* Supplier Directory (New Feature) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Wrench className="h-5 w-5 mr-2 text-gray-500" /> Trusted Building Suppliers
          </h2>
        </div>
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {suppliers.map((supplier, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 transition flex justify-between items-center group">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">{supplier.role}</p>
                <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-500 ml-1">{supplier.rating} / 5.0</span>
                </div>
              </div>
              <a 
                href={`tel:${supplier.phone}`}
                className="bg-white border border-gray-200 text-gray-700 p-2 rounded-full hover:border-blue-500 hover:text-blue-500 transition shadow-sm"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;