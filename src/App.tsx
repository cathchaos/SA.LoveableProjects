import { useState } from 'react';
import { Users, Zap, Sparkles, RefreshCcw } from 'lucide-react';
import { RosterManager } from './components/RosterManager';
import { FeudTracker } from './components/FeudTracker';
import { StorylineGenerator } from './components/StorylineGenerator';
import { TurnPlanner } from './components/TurnPlanner';

type Tab = 'roster' | 'feuds' | 'generator' | 'turns';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('generator');

  const tabs = [
    { id: 'generator' as Tab, name: 'Storyline Generator', icon: Sparkles, color: 'purple' },
    { id: 'turns' as Tab, name: 'Turn Planner', icon: RefreshCcw, color: 'green' },
    { id: 'feuds' as Tab, name: 'Feuds', icon: Zap, color: 'yellow' },
    { id: 'roster' as Tab, name: 'Roster', icon: Users, color: 'red' },
  ];

  const getTabColor = (color: string, isActive: boolean) => {
    if (isActive) {
      switch(color) {
        case 'red': return 'bg-red-600 text-white';
        case 'yellow': return 'bg-yellow-500 text-white';
        case 'purple': return 'bg-purple-600 text-white';
        case 'green': return 'bg-green-600 text-white';
        default: return 'bg-gray-600 text-white';
      }
    }
    return 'bg-white text-gray-700 hover:bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <header className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-3xl">W</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                WWE CREATIVE CONTROL
              </h1>
              <p className="text-gray-400 text-sm">The Ultimate Storyline & Feud Generator</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap ${getTabColor(tab.color, activeTab === tab.id)} ${
                    activeTab === tab.id ? 'shadow-lg scale-105' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'roster' && <RosterManager />}
        {activeTab === 'feuds' && <FeudTracker />}
        {activeTab === 'generator' && <StorylineGenerator />}
        {activeTab === 'turns' && <TurnPlanner />}
      </main>

      <footer className="mt-12 py-6 text-center text-gray-500 text-sm">
        <p>WWE Creative Control - Freshen up the creative. Think outside the box.</p>
      </footer>
    </div>
  );
}

export default App;
