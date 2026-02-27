import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RefreshCcw, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Wrestler = Database['public']['Tables']['wrestlers']['Row'];

interface TurnMethod {
  name: string;
  description: string;
  effectiveness: 'High' | 'Medium' | 'Low';
  risk: 'High' | 'Medium' | 'Low';
  steps: string[];
}

const HEEL_TURN_METHODS: TurnMethod[] = [
  {
    name: 'The Brutal Beatdown',
    description: 'Viciously attack a beloved face, especially after helping them',
    effectiveness: 'High',
    risk: 'Low',
    steps: [
      'Build friendship/partnership with popular face',
      'Win their trust over several weeks',
      'Celebrate a big victory together',
      'Suddenly attack them with excessive force',
      'Use weapons or continue after they\'re down',
      'Cut promo explaining your "justified" actions',
    ],
  },
  {
    name: 'The Slow Burn',
    description: 'Gradually show darker tendencies over time',
    effectiveness: 'High',
    risk: 'Medium',
    steps: [
      'Start with small rule-bending (holds too long, etc.)',
      'Show frustration with losses',
      'Begin trash-talking opponents',
      'Use questionable tactics to win',
      'Ignore or dismiss fan reactions',
      'Fully embrace heel persona',
    ],
  },
  {
    name: 'The Authority Alliance',
    description: 'Align with an authority figure or corrupt power',
    effectiveness: 'Medium',
    risk: 'Medium',
    steps: [
      'Struggle against unfair authority',
      'Receive special opportunity from them',
      'Initially refuse, then reluctantly accept',
      'Start getting preferential treatment',
      'Defend the authority against faces',
      'Become their chosen champion',
    ],
  },
  {
    name: 'The Jealous Rival',
    description: 'Turn due to jealousy of another\'s success',
    effectiveness: 'Medium',
    risk: 'Low',
    steps: [
      'Be overshadowed by more successful partner/friend',
      'Show subtle signs of jealousy',
      'Congratulate them but look conflicted',
      'Cost them a big match "accidentally"',
      'Blame them for holding you back',
      'Attack them out of "frustration"',
    ],
  },
];

const FACE_TURN_METHODS: TurnMethod[] = [
  {
    name: 'The Heroic Save',
    description: 'Save a face from a beatdown despite your heel status',
    effectiveness: 'High',
    risk: 'Low',
    steps: [
      'Witness heel group attacking face 3-on-1',
      'Show hesitation, then intervene',
      'Fight off your former allies',
      'Help the face to their feet',
      'Former group declares war on you',
      'Fight alongside faces going forward',
    ],
  },
  {
    name: 'The Respect Turn',
    description: 'Gain respect through honest competition',
    effectiveness: 'High',
    risk: 'Medium',
    steps: [
      'Lose clean to a respected face',
      'Initially refuse handshake',
      'Save them from post-match attack',
      'Demand a rematch with no cheating',
      'Have an incredible match',
      'Show respect win or lose',
    ],
  },
  {
    name: 'The Betrayal Response',
    description: 'Turned on by your heel faction',
    effectiveness: 'High',
    risk: 'Low',
    steps: [
      'Heel group questions your commitment',
      'They set you up to fail',
      'Leader blames you publicly',
      'Group attacks you',
      'Faces help you fight them off',
      'Join forces against common enemy',
    ],
  },
  {
    name: 'The People\'s Organic Turn',
    description: 'Fans cheer you despite being heel',
    effectiveness: 'Medium',
    risk: 'High',
    steps: [
      'Continue being great at heel work',
      'Show respect to worthy opponents',
      'Acknowledge crowd reactions',
      'Start targeting actual villains',
      'Keep your edge but fight for fans',
      'Natural transition without changing much',
    ],
  },
];

export function TurnPlanner() {
  const [wrestlers, setWrestlers] = useState<Wrestler[]>([]);
  const [selectedWrestler, setSelectedWrestler] = useState<Wrestler | null>(null);
  const [turnType, setTurnType] = useState<'heel' | 'face'>('heel');
  const [selectedMethod, setSelectedMethod] = useState<TurnMethod | null>(null);

  useEffect(() => {
    loadWrestlers();
  }, []);

  async function loadWrestlers() {
    const { data, error } = await supabase
      .from('wrestlers')
      .select('*')
      .order('name');

    if (!error && data) {
      setWrestlers(data);
    }
  }

  async function executeTurn() {
    if (!selectedWrestler || !selectedMethod) return;

    const newAlignment = turnType === 'heel' ? 'Heel' : 'Face';

    await supabase
      .from('wrestlers')
      .update({
        alignment: newAlignment,
        updated_at: new Date().toISOString(),
      })
      .eq('id', selectedWrestler.id);

    const storylineTitle = `${turnType === 'heel' ? 'Heel' : 'Face'} Turn: ${selectedWrestler.name} - ${selectedMethod.name}`;
    const storylineDescription = `${selectedWrestler.name} turns ${turnType === 'heel' ? 'heel' : 'face'} using ${selectedMethod.name} method: ${selectedMethod.description}`;

    await supabase.from('storylines').insert([{
      title: storylineTitle,
      description: storylineDescription,
      type: turnType === 'heel' ? 'Heel Turn' : 'Face Turn',
      participants: [selectedWrestler.id],
      execution_steps: selectedMethod.steps,
    }]);

    alert(`${selectedWrestler.name} is now scheduled to turn ${turnType === 'heel' ? 'heel' : 'face'}! Check Storyline Generator for the plan.`);

    loadWrestlers();
    setSelectedWrestler(null);
    setSelectedMethod(null);
  }

  const availableMethods = turnType === 'heel' ? HEEL_TURN_METHODS : FACE_TURN_METHODS;

  const getEffectivenessColor = (level: string) => {
    switch(level) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <RefreshCcw className="w-8 h-8 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Heel/Face Turn Planner</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Wrestler
          </label>
          <div className="space-y-2 max-h-96 overflow-y-auto p-2 bg-gray-50 rounded-lg">
            {wrestlers.map((wrestler) => (
              <button
                key={wrestler.id}
                onClick={() => {
                  setSelectedWrestler(wrestler);
                  setTurnType(wrestler.alignment === 'Heel' ? 'face' : 'heel');
                  setSelectedMethod(null);
                }}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedWrestler?.id === wrestler.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{wrestler.name}</div>
                    <div className="text-sm opacity-80">
                      Current: {wrestler.alignment} ({wrestler.brand})
                    </div>
                  </div>
                  {selectedWrestler?.id === wrestler.id && (
                    <div className="flex items-center gap-2">
                      {turnType === 'heel' ? (
                        <TrendingDown className="w-5 h-5" />
                      ) : (
                        <TrendingUp className="w-5 h-5" />
                      )}
                      <span className="text-sm font-semibold">
                        Turn {turnType === 'heel' ? 'Heel' : 'Face'}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Turn Method {selectedWrestler && `(${turnType === 'heel' ? 'Heel' : 'Face'} Turn)`}
          </label>
          {selectedWrestler ? (
            <div className="space-y-2 max-h-96 overflow-y-auto p-2 bg-gray-50 rounded-lg">
              {availableMethods.map((method, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMethod(method)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedMethod?.name === method.name
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <div className="font-bold mb-1">{method.name}</div>
                  <div className="text-sm opacity-90 mb-2">{method.description}</div>
                  <div className="flex gap-4 text-xs">
                    <span className={selectedMethod?.name === method.name ? 'text-white' : getEffectivenessColor(method.effectiveness)}>
                      Effectiveness: {method.effectiveness}
                    </span>
                    <span className={selectedMethod?.name === method.name ? 'text-white' : getRiskColor(method.risk)}>
                      Risk: {method.risk}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Select a wrestler to see available turn methods</p>
            </div>
          )}
        </div>
      </div>

      {selectedMethod && selectedWrestler && (
        <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Execution Plan: {selectedMethod.name}
          </h3>
          <div className="mb-4 p-4 bg-white rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Wrestler:</strong> {selectedWrestler.name}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Current Alignment:</strong> {selectedWrestler.alignment}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>New Alignment:</strong> {turnType === 'heel' ? 'Heel' : 'Face'}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Method:</strong> {selectedMethod.description}
            </p>
            <div className="flex gap-4 mt-3">
              <span className={`font-semibold ${getEffectivenessColor(selectedMethod.effectiveness)}`}>
                Effectiveness: {selectedMethod.effectiveness}
              </span>
              <span className={`font-semibold ${getRiskColor(selectedMethod.risk)}`}>
                Risk: {selectedMethod.risk}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-lg mb-3 text-gray-900">Step-by-Step Guide:</h4>
            <ol className="space-y-3">
              {selectedMethod.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="font-bold text-green-600 text-lg min-w-[28px]">
                    {index + 1}.
                  </span>
                  <span className="text-gray-800 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <button
            onClick={executeTurn}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
          >
            Execute Turn & Save to Storylines
          </button>
        </div>
      )}
    </div>
  );
}
