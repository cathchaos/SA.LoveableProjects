import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { FileText, Download, TrendingUp, ArrowLeft, AlertTriangle, Search, Check, Clock, CreditCard, UserCircle, Gavel, Send, Briefcase } from 'lucide-react';

const Finances = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'residents'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Track automation states
  const [warnedResidents, setWarnedResidents] = useState<number[]>([]);
  const [escalatedResidents, setEscalatedResidents] = useState<number[]>([]);

  // --- MOCK DATA ---
  const communalExpenses = [
    { id: 1, building: "Building 1", date: '2024-03-01', category: 'Utilities', description: 'Common Area Electricity', amount: 145.50 },
    { id: 2, building: "Building 1", date: '2024-03-02', category: 'Cleaning', description: 'Weekly Staircase Cleaning', amount: 80.00 },
    { id: 3, building: "Building 1", date: '2024-03-05', category: 'Maintenance', description: 'Elevator Monthly Service', amount: 120.00 },
    { id: 4, building: "Building 2", date: '2024-03-10', category: 'Garden', description: 'New plants for entrance', amount: 45.00 },
  ];

  const residents = [
    { id: 101, building: "Building 1", apt: "101", name: "John Smith", monthlyFee: 45, balance: 0, monthsOwed: 0, lastPaid: "2024-03-01" },
    { id: 102, building: "Building 1", apt: "102", name: "Sarah Connor", monthlyFee: 45, balance: 45, monthsOwed: 1, lastPaid: "2024-02-01" },
    { id: 201, building: "Building 1", apt: "201", name: "Mike Ross", monthlyFee: 55, balance: 0, monthsOwed: 0, lastPaid: "2024-03-02" },
    { id: 202, building: "Building 1", apt: "202", name: "Jessica Day", monthlyFee: 55, balance: 165, monthsOwed: 3, lastPaid: "2023-12-01" }, 
    { id: 301, building: "Building 1", apt: "301", name: "Walter White", monthlyFee: 60, balance: 240, monthsOwed: 4, lastPaid: "2023-11-01" },
    { id: 999, building: "Building 2", apt: "A1", name: "Bruce Wayne", monthlyFee: 100, balance: 0, monthsOwed: 0, lastPaid: "2024-03-01" },
  ];

  // --- FILTERING LOGIC ---
  const myBuildingExpenses = communalExpenses.filter(e => e.building === user?.building);
  const myBuildingResidents = residents.filter(r => r.building === user?.building);
  
  const filteredResidents = myBuildingResidents.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.apt.includes(searchTerm));
  const criticalDebtors = myBuildingResidents.filter(r => r.monthsOwed >= 3);

  const myData = myBuildingResidents.find(r => r.apt === user?.apartment);

  // --- ACTIONS ---
  
  // 1. Send Warning to Resident
  const handleSendLegalWarning = (residentId: number, name: string) => {
    alert(`
      📧 EMAIL SENT TO RESIDENT: ${name}
      ------------------------------------------------
      "Final Notice: Please pay your outstanding balance within 15 days to avoid legal action."
    `);
    setWarnedResidents(prev => [...prev, residentId]);
  };

  // 2. Escalate to Legal Partners
  const handleEscalateToLegal = (residentId: number, name: string, balance: number) => {
    alert(`
      ⚖️ CASE FILE SENT TO: Legal Partners (Law Firm XYZ)
      ------------------------------------------------
      Subject: New Case Filing - ${name}
      
      "Please initiate legal proceedings against ${name} (Apt Owner).
      Outstanding Debt: €${balance}
      Evidence: Warning sent 15+ days ago (Attached).
      Building: ${user?.building}
      
      Proceed with filing court summons immediately."
    `);
    setEscalatedResidents(prev => [...prev, residentId]);
  };

  // --- RESIDENT VIEW COMPONENT ---
  const ResidentView = () => {
    if (!myData) return <div className="text-center p-8">No financial data found for this unit.</div>;

    return (
      <div className="animate-fade-in space-y-6">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h2 className="text-lg font-medium opacity-90">My Outstanding Balance</h2>
            <div className="flex items-baseline mt-2">
              <span className="text-4xl font-bold">€{myData.balance.toFixed(2)}</span>
              {myData.balance > 0 && <span className="ml-2 opacity-75">overdue</span>}
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-900 font-semibold">Monthly Common Expense</p>
                <p className="text-sm text-gray-500">For {user?.building}, Apt {user?.apartment}</p>
              </div>
              <span className="text-gray-900 font-bold">€{myData.monthlyFee.toFixed(2)}</span>
            </div>
            
            {myData.balance > 0 ? (
              <div className="border-t border-gray-100 pt-6">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex justify-center items-center">
                  <CreditCard className="h-5 w-5 mr-2" /> Pay Balance Now
                </button>
                <p className="text-center text-xs text-gray-400 mt-3 flex justify-center items-center">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded mr-2">SECURE</span>
                  Encrypted Payment Gateway
                </p>
              </div>
            ) : (
              <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center justify-center font-medium">
                <Check className="h-5 w-5 mr-2" /> You are fully paid up!
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Payment History</h3>
          <div className="flex justify-between items-center pb-4 border-b border-gray-50">
            <div>
              <p className="font-medium text-gray-900">Common Expenses</p>
              <p className="text-xs text-gray-500">{myData.lastPaid}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">-€{myData.monthlyFee}</p>
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Paid</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-2 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Portal
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-800">Financial Management</h1>
              {user?.role === 'admin' && <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">ADMIN VIEW</span>}
            </div>
            <p className="text-gray-500 mt-1">
              {user?.role === 'admin' ? `Managing finances for ${user.building}` : "Manage your payments and history"}
            </p>
          </div>
        </div>
      </div>

      {/* --- CONDITIONAL RENDERING BASED ON ROLE --- */}
      
      {user?.role === 'resident' ? (
        <ResidentView />
      ) : (
        <>
          {/* Admin Tabs */}
          <div className="flex border-b border-gray-200">
            {['overview', 'expenses', 'residents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Critical Alerts (Admin Only) */}
          {criticalDebtors.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-slide-in">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex items-start flex-1">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-red-800 font-bold">Action Required: 3+ Months Overdue</h3>
                    <p className="text-red-700 text-sm mt-1">These residents have exceeded the payment threshold:</p>
                    <ul className="mt-3 space-y-3">
                      {criticalDebtors.map(debtor => (
                        <li key={debtor.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/50 p-2 rounded border border-red-100">
                          <span className="text-sm text-red-900 font-medium">
                            Apt {debtor.apt} ({debtor.name}) — €{debtor.balance}
                          </span>
                          
                          {/* BUTTON LOGIC: Show different buttons based on state */}
                          <div className="flex items-center gap-2">
                            {escalatedResidents.includes(debtor.id) ? (
                              <span className="inline-flex items-center text-xs font-bold text-gray-700 bg-gray-200 px-3 py-1.5 rounded-full border border-gray-300">
                                <Briefcase className="h-3 w-3 mr-1" /> Legal Team Notified
                              </span>
                            ) : warnedResidents.includes(debtor.id) ? (
                              <button 
                                onClick={() => handleEscalateToLegal(debtor.id, debtor.name, debtor.balance)}
                                className="inline-flex items-center text-xs font-bold text-white bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-full shadow-sm transition-colors whitespace-nowrap animate-pulse"
                              >
                                <Gavel className="h-3 w-3 mr-1.5" /> Escalate to Legal Partners
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleSendLegalWarning(debtor.id, debtor.name)}
                                className="inline-flex items-center text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-full shadow-sm transition-colors whitespace-nowrap"
                              >
                                <Send className="h-3 w-3 mr-1.5" /> Send Warning
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-3 gap-6 animate-slide-in">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">Current Balance</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">€2,450.00</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">YTD Income</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">€30,300.00</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">YTD Expenses</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">€18,450.00</h3>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-slide-in">
              <div className="p-4 bg-gray-50 border-b flex justify-between">
                <span className="font-semibold text-gray-700">Building Expenses Log</span>
                <span className="text-xs text-gray-500">{user?.building}</span>
              </div>
              <table className="w-full text-left">
                <thead className="bg-white text-xs uppercase text-gray-500 font-semibold border-b">
                  <tr><th className="px-6 py-3">Date</th><th className="px-6 py-3">Category</th><th className="px-6 py-3">Description</th><th className="px-6 py-3 text-right">Amount</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {myBuildingExpenses.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">{e.date}</td>
                      <td className="px-6 py-4"><span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{e.category}</span></td>
                      <td className="px-6 py-4 text-sm">{e.description}</td>
                      <td className="px-6 py-4 text-sm font-bold text-right">-€{e.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'residents' && (
            <div className="space-y-4 animate-slide-in">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search apartment..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                    <tr><th className="px-6 py-3">Apt</th><th className="px-6 py-3">Name</th><th className="px-6 py-3">Balance</th><th className="px-6 py-3">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredResidents.map((r) => (
                      <tr key={r.id} className={`hover:bg-gray-50 ${r.monthsOwed >= 3 ? 'bg-red-50/30' : ''}`}>
                        <td className="px-6 py-4 font-bold">{r.apt}</td>
                        <td className="px-6 py-4 text-sm">{r.name}</td>
                        <td className={`px-6 py-4 font-bold ${r.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>€{r.balance}</td>
                        <td className="px-6 py-4">
                          {/* Row Status Badges (Visual only here, action is at top) */}
                          {escalatedResidents.includes(r.id) ? <span className="text-gray-600 bg-gray-200 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit"><Briefcase className="h-3 w-3 mr-1"/>Legal</span> :
                           warnedResidents.includes(r.id) ? <span className="text-orange-800 bg-orange-100 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit"><Send className="h-3 w-3 mr-1"/>Warned</span> :
                           r.balance === 0 ? <span className="text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit"><Check className="h-3 w-3 mr-1"/>Paid</span> :
                           r.monthsOwed >= 3 ? <span className="text-white bg-red-500 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit"><AlertTriangle className="h-3 w-3 mr-1"/>Late</span> :
                           <span className="text-orange-700 bg-orange-100 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit"><Clock className="h-3 w-3 mr-1"/>Due</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Finances;