import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, FolderOpen, Download, ArrowLeft, Search, Filter } from 'lucide-react';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'building' | 'financial'>('all');

  // Mock Data
  const docs = [
    { id: 1, name: "Building Rules & Regulations", type: "building", date: "2023-01-01", size: "2.4 MB" },
    { id: 2, name: "Insurance Policy 2024", type: "building", date: "2024-01-15", size: "1.1 MB" },
    { id: 3, name: "Maintenance Schedule Q1", type: "building", date: "2024-02-01", size: "850 KB" },
    { id: 4, name: "Annual Budget Report 2024", type: "financial", date: "2023-12-20", size: "3.2 MB" },
    { id: 5, name: "Q1 Expense Statement", type: "financial", date: "2024-04-01", size: "1.5 MB" },
  ];

  // Filter Logic
  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || doc.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-2 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Portal
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Document Center</h1>
            <p className="text-gray-500 mt-1">Access and download important building files</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center font-medium">
            <Download className="h-4 w-4 mr-2" /> Download All
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-lg w-full md:w-auto">
          {['all', 'building', 'financial'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all w-full md:w-auto ${
                activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredDocs.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="p-4 hover:bg-blue-50/30 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${doc.type === 'financial' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{doc.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span>{doc.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-all">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No documents found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;