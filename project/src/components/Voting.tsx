import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Users, AlertCircle, ArrowLeft } from "lucide-react";

const Voting: React.FC = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState({ optionA: 45, optionB: 55 });

  const handleVote = (option: 'optionA' | 'optionB') => {
    if (hasVoted) return;
    setVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
    setHasVoted(true);
  };

  const getPercentage = (val: number) => {
    const total = votes.optionA + votes.optionB;
    if (total === 0) return 0;
    return Math.round((val / total) * 100);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back Arrow */}
      <div>
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Portal
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Voting & Decisions</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Create New Poll
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Active Polls</h3>
            <CheckSquare className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">1</p>
          <p className="text-sm text-gray-500 mt-1">Waiting for your vote</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Required Votes</h3>
            <Users className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">24/32</p>
          <p className="text-sm text-gray-500 mt-1">Minimum needed (75%)</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Current Turnout</h3>
            <Users className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">28/32</p>
          <p className="text-sm text-gray-500 mt-1">87.5% participation</p>
        </div>
      </div>

      {/* Poll */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Building Facade Renovation</h2>
            <p className="text-gray-500 mt-1">Ends in 5 days</p>
          </div>
          {hasVoted && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Voted
            </span>
          )}
        </div>

        <div className="space-y-6">
          {/* Option A */}
          <div 
            className={`cursor-pointer p-4 rounded-lg border-2 ${hasVoted ? 'border-transparent' : 'border-transparent hover:border-blue-100'}`}
            onClick={() => handleVote('optionA')}
          >
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span className="font-medium">Option A: Modern Design</span>
              <span>{getPercentage(votes.optionA)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(votes.optionA)}%` }}
              ></div>
            </div>
          </div>

          {/* Option B */}
          <div 
            className={`cursor-pointer p-4 rounded-lg border-2 ${hasVoted ? 'border-transparent' : 'border-transparent hover:border-blue-100'}`}
            onClick={() => handleVote('optionB')}
          >
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span className="font-medium">Option B: Classical Design</span>
              <span>{getPercentage(votes.optionB)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(votes.optionB)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;