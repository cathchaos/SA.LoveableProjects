import React from "react";
import { Link } from "react-router-dom";
import { DollarSign, FileText, CheckSquare, AlertTriangle, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { useAuth } from "../Context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth(); // Assuming useAuth provides the user object

  return (
    <div className="animate-fade-in space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.apartment || 'Owner'}
        </h1>
        <p className="text-blue-100 opacity-90">
          Building: <span className="font-semibold">{user?.building || 'Main Building'}</span> • All systems operational
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Quick Actions (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <ShieldCheck className="mr-2 h-5 w-5 text-blue-600" />
            Overview & Actions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Finances Card */}
            <Link to="/finances" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Finances</h3>
              <p className="text-sm text-gray-500 mt-1">Status: <span className="text-green-600 font-medium">Paid</span></p>
              <p className="text-xs text-gray-400 mt-2">Last payment: €45.00 on Mar 1st</p>
            </Link>

            {/* Voting Card */}
            <Link to="/voting" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <CheckSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                  1 Active
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Voting Center</h3>
              <p className="text-sm text-gray-500 mt-1">Pending: Facade Renovation</p>
              <p className="text-xs text-gray-400 mt-2">Your vote is required</p>
            </Link>

            {/* Maintenance Card */}
            <Link to="/maintenance" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Maintenance</h3>
              <p className="text-sm text-gray-500 mt-1">Report issues or check status</p>
              <p className="text-xs text-gray-400 mt-2">No open tickets for your unit</p>
            </Link>

            {/* Documents Card */}
            <Link to="/documents" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
              <p className="text-sm text-gray-500 mt-1">Access building regulations</p>
              <p className="text-xs text-gray-400 mt-2">3 new files added this month</p>
            </Link>
          </div>
        </div>

        {/* Right Column: Activity Feed (1/3 width) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-600" />
            Recent Activity
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {[
                { event: "New Expense Report", detail: "February 2024", time: "Today, 10:00 AM" },
                { event: "Maintenance Scheduled", detail: "Elevator Inspection", time: "Yesterday" },
                { event: "Announcement", detail: "Water cut scheduled for 15/03", time: "2 days ago" },
                { event: "Voting Started", detail: "Entrance Painting", time: "3 days ago" },
              ].map((item, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-default">
                  <p className="text-sm font-semibold text-gray-800">{item.event}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.detail}</p>
                  <p className="text-xs text-gray-400 mt-2">{item.time}</p>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800">View All History</button>
            </div>
          </div>
          
          {/* Quick Contact Widget */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-1">Need urgent help?</h3>
            <p className="text-xs text-blue-700 mb-3">
              For emergencies like water leaks or security issues.
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer" 
              className="block w-full bg-white text-blue-600 text-center py-2 rounded border border-blue-200 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;