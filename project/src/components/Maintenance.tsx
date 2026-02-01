import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, Clock, Plus, X, ArrowLeft, MoreHorizontal } from 'lucide-react';

type Request = {
  id: number;
  date: string;
  issue: string;
  location: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
};

const Maintenance = () => {
  const [showForm, setShowForm] = useState(false);
  const [newIssue, setNewIssue] = useState({ issue: '', location: '', priority: 'Medium' });
  
  const [requests, setRequests] = useState<Request[]>([
    { id: 1, date: '2024-03-15', issue: 'Elevator malfunction', location: 'Main Elevator', status: 'In Progress', priority: 'High' },
    { id: 2, date: '2024-03-14', issue: 'Broken light fixture', location: '2nd Floor Hallway', status: 'Completed', priority: 'Medium' },
    { id: 3, date: '2024-03-18', issue: 'Leaking pipe', location: 'Basement Parking', status: 'Pending', priority: 'High' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const request: Request = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      issue: newIssue.issue,
      location: newIssue.location,
      status: 'Pending',
      priority: newIssue.priority as 'High' | 'Medium' | 'Low'
    };
    setRequests([request, ...requests]);
    setShowForm(false);
    setNewIssue({ issue: '', location: '', priority: 'Medium' });
  };

  // Helper component for the status tracker
  const StatusTracker = ({ status }: { status: Request['status'] }) => {
    const steps = ['Pending', 'In Progress', 'Completed'];
    const currentStepIndex = steps.indexOf(status);

    return (
      <div className="flex items-center gap-2">
        {steps.map((step, idx) => (
          <div key={step} className="flex items-center">
            <div 
              className={`w-2.5 h-2.5 rounded-full ${
                idx <= currentStepIndex 
                  ? (status === 'Completed' ? 'bg-green-500' : 'bg-blue-500') 
                  : 'bg-gray-200'
              }`} 
              title={step}
            />
            {idx < steps.length - 1 && (
              <div className={`w-4 h-0.5 mx-1 ${idx < currentStepIndex ? 'bg-blue-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
        <span className="text-xs font-medium text-gray-600 ml-2">{status}</span>
      </div>
    );
  };

  return (
    <div className="space-y-8 relative animate-fade-in pb-12">
      <div>
        <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-2 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Portal
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Maintenance</h1>
            <p className="text-gray-500 mt-1">Track and report building issues</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-md font-medium"
          >
            <Plus size={18} /> New Request
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 mb-6 animate-slide-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Submit New Request</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 transition-colors"><X /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input 
              required
              placeholder="What's the issue?" 
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              value={newIssue.issue}
              onChange={e => setNewIssue({...newIssue, issue: e.target.value})}
            />
            <input 
              required
              placeholder="Location (e.g. 2nd Floor)" 
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              value={newIssue.location}
              onChange={e => setNewIssue({...newIssue, location: e.target.value})}
            />
            <select 
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              value={newIssue.priority}
              onChange={e => setNewIssue({...newIssue, priority: e.target.value})}
            >
              <option>Low Priority</option>
              <option>Medium Priority</option>
              <option>High Priority</option>
            </select>
            <button type="submit" className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-medium transition-colors">
              Submit Ticket
            </button>
          </form>
        </div>
      )}

      {/* Ticket List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-800 text-lg">Recent Tickets</h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
        </div>
        <div className="divide-y divide-gray-50">
          {requests.map((req) => (
            <div key={req.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-lg ${req.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{req.issue}</h3>
                  <p className="text-sm text-gray-500">{req.location} • {req.date}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:gap-12">
                <StatusTracker status={req.status} />
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;