import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, Star, Trash2, RefreshCw, Lightbulb } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Wrestler = Database['public']['Tables']['wrestlers']['Row'];
type Storyline = Database['public']['Tables']['storylines']['Row'];

interface StorylineTemplate {
  type: string;
  templates: {
    title: string;
    description: string;
    steps: string[];
  }[];
}

const STORYLINE_TEMPLATES: StorylineTemplate[] = [
  {
    type: 'Heel Turn',
    templates: [
      {
        title: 'The Betrayal',
        description: 'A trusted ally turns on their partner at a critical moment',
        steps: [
          'Build up the tag team / alliance over several weeks',
          'Have them win a big match together',
          'Create tension with subtle disagreements',
          'Partner costs them a championship opportunity',
          'Emotional confrontation where they explain their actions',
          'Vicious attack to solidify the turn',
        ],
      },
      {
        title: 'The Corruption',
        description: 'A face gradually becomes frustrated and embraces darker methods',
        steps: [
          'Have them lose multiple times due to "following the rules"',
          'Show increasing frustration with management/authority',
          'Heel character offers them "the easy way"',
          'They reluctantly accept help once',
          'Gradual acceptance of cheating tactics',
          'Full embrace of heel persona with new attitude',
        ],
      },
      {
        title: 'The Revelation',
        description: 'Shocking reveal that they were the mastermind all along',
        steps: [
          'Create a mystery or conspiracy storyline',
          'Have them play detective/victim',
          'Plant subtle clues looking back',
          'Big reveal moment with evidence',
          'Monologue explaining their master plan',
          'Align with unexpected allies',
        ],
      },
    ],
  },
  {
    type: 'Face Turn',
    templates: [
      {
        title: 'The Redemption',
        description: 'Heel realizes the error of their ways and seeks forgiveness',
        steps: [
          'Show cracks in their heel persona',
          'Have them be betrayed by heel allies',
          'Receive help from an unexpected face',
          'Public apology or acknowledgment of mistakes',
          'Defend a face against overwhelming odds',
          'Earn respect through actions, not words',
        ],
      },
      {
        title: 'The Stand',
        description: 'Heel goes too far, forcing them to stand against their own group',
        steps: [
          'Heel faction becomes increasingly extreme',
          'They show hesitation with certain tactics',
          'Faction targets someone they care about',
          'They refuse to participate',
          'Faction turns on them',
          'They fight back alongside faces',
        ],
      },
      {
        title: 'The People\'s Choice',
        description: 'Heel is so good at what they do, fans organically cheer them',
        steps: [
          'Continue heel tactics but with style',
          'Show moments of respect for worthy opponents',
          'Crowd reactions become louder each week',
          'Acknowledge the fans without fully turning',
          'Gradual shift in targets to actual heels',
          'Natural evolution to face while keeping edge',
        ],
      },
    ],
  },
  {
    type: 'Fresh Feud',
    templates: [
      {
        title: 'The Collision Course',
        description: 'Two stars on winning streaks inevitably clash',
        steps: [
          'Both wrestlers dominate separate divisions',
          'Backstage near-misses and tension',
          'War of words on social media/promos',
          'Physical altercation at a big event',
          'Authority makes the match official',
          'Series of increasingly intense matches',
        ],
      },
      {
        title: 'The Grudge Match',
        description: 'Personal issue from the past resurfaces',
        steps: [
          'Reference old history between them',
          'Accidental encounter backstage',
          'One brings up the past publicly',
          'Other denies or dismisses it',
          'Evidence or witnesses confirm the story',
          'Settle it in the ring once and for all',
        ],
      },
      {
        title: 'The Opportunist',
        description: 'One wrestler capitalizes on another\'s moment',
        steps: [
          'Wrestler A wins a major match/title',
          'Wrestler B interrupts celebration',
          'Claims they deserve the opportunity',
          'Creates chaos at A\'s matches',
          'Management gives them a qualifier match',
          'Build to championship match',
        ],
      },
    ],
  },
  {
    type: 'Surprise',
    templates: [
      {
        title: 'The Unlikely Alliance',
        description: 'Bitter enemies forced to work together',
        steps: [
          'Common enemy threatens both of them',
          'Management forces tag team match',
          'Initial refusal and conflict',
          'Begrudging cooperation',
          'Success despite differences',
          'Friendship or renewed rivalry after',
        ],
      },
      {
        title: 'The Identity Crisis',
        description: 'Wrestler adopts a radically new persona',
        steps: [
          'Series of devastating losses',
          'Disappear from TV for a few weeks',
          'Vignettes showing transformation',
          'Return with completely new look/attitude',
          'Demolish old rivals with new style',
          'Explain the metamorphosis',
        ],
      },
      {
        title: 'The Succession',
        description: 'Veteran passes the torch to rising star',
        steps: [
          'Veteran notices rising star\'s potential',
          'Offers mentorship or advice',
          'Student becomes too confident',
          'Friendly competition escalates',
          'Student defeats mentor clean',
          'Respectful handshake or attack after',
        ],
      },
    ],
  },
  {
    type: 'Faction',
    templates: [
      {
        title: 'The Recruitment',
        description: 'Established group targets a specific wrestler',
        steps: [
          'Group approaches target with offer',
          'Target refuses multiple times',
          'Group attacks/humiliates them',
          'Target fights back alone',
          'Group overwhelms them',
          'Decision: join or continue fighting',
        ],
      },
      {
        title: 'The Mutiny',
        description: 'Member challenges for leadership of the group',
        steps: [
          'Show subordinate doing all the work',
          'Leader takes credit for victories',
          'Tension builds over leadership decisions',
          'Public challenge for control',
          'Group splits into factions',
          'Winner take all match',
        ],
      },
      {
        title: 'The Hostile Takeover',
        description: 'New group emerges to destroy the old guard',
        steps: [
          'Mysterious attacks on top stars',
          'Reveal of new faction',
          'Declaration of war on establishment',
          'Systematic targeting of champions',
          'Veterans band together',
          'War Games / WarGames-style payoff',
        ],
      },
    ],
  },
];

export function StorylineGenerator() {
  const [wrestlers, setWrestlers] = useState<Wrestler[]>([]);
  const [storylines, setStorylines] = useState<Storyline[]>([]);
  const [selectedType, setSelectedType] = useState('Heel Turn');
  const [selectedWrestlers, setSelectedWrestlers] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    loadWrestlers();
    loadStorylines();
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

  async function loadStorylines() {
    const { data, error } = await supabase
      .from('storylines')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setStorylines(data);
    }
  }

  function generateStoryline() {
    if (selectedWrestlers.length === 0) {
      alert('Please select at least one wrestler');
      return;
    }

    const typeTemplates = STORYLINE_TEMPLATES.find(t => t.type === selectedType);
    if (!typeTemplates) return;

    const randomTemplate = typeTemplates.templates[Math.floor(Math.random() * typeTemplates.templates.length)];

    const participantNames = selectedWrestlers.map(id => {
      const wrestler = wrestlers.find(w => w.id === id);
      return wrestler?.name || 'Unknown';
    }).join(', ');

    let customizedTitle = randomTemplate.title;
    let customizedDescription = randomTemplate.description;

    if (selectedWrestlers.length === 1) {
      const wrestler = wrestlers.find(w => w.id === selectedWrestlers[0]);
      customizedTitle = `${randomTemplate.title}: ${wrestler?.name}`;
      customizedDescription = `${wrestler?.name} ${randomTemplate.description.toLowerCase()}`;
    } else if (selectedWrestlers.length === 2) {
      const w1 = wrestlers.find(w => w.id === selectedWrestlers[0]);
      const w2 = wrestlers.find(w => w.id === selectedWrestlers[1]);
      customizedTitle = `${randomTemplate.title}: ${w1?.name} & ${w2?.name}`;
      customizedDescription = `${w1?.name} and ${w2?.name} in ${randomTemplate.description.toLowerCase()}`;
    }

    return {
      title: customizedTitle,
      description: customizedDescription,
      type: selectedType,
      participants: selectedWrestlers,
      execution_steps: randomTemplate.steps,
    };
  }

  async function handleGenerate() {
    const storyline = generateStoryline();
    if (!storyline) return;

    await supabase.from('storylines').insert([storyline]);
    loadStorylines();
    setShowSaved(true);
  }

  async function handleDelete(id: string) {
    await supabase.from('storylines').delete().eq('id', id);
    loadStorylines();
  }

  async function toggleFavorite(id: string, currentValue: boolean) {
    await supabase
      .from('storylines')
      .update({ favorited: !currentValue })
      .eq('id', id);
    loadStorylines();
  }

  function toggleWrestlerSelection(id: string) {
    setSelectedWrestlers(prev =>
      prev.includes(id)
        ? prev.filter(wId => wId !== id)
        : [...prev, id]
    );
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Heel Turn': return 'bg-red-100 text-red-800 border-red-300';
      case 'Face Turn': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Fresh Feud': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Surprise': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Faction': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Storyline Generator</h2>
        </div>
        <button
          onClick={() => setShowSaved(!showSaved)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Star className="w-5 h-5" />
          {showSaved ? 'Generator' : 'Saved Ideas'}
        </button>
      </div>

      {!showSaved ? (
        <>
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
            <div className="flex items-start gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Create Fresh Storylines</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Select wrestlers and a storyline type to generate creative ideas with step-by-step execution plans.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Storyline Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {STORYLINE_TEMPLATES.map((template) => (
                  <button
                    key={template.type}
                    onClick={() => setSelectedType(template.type)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedType === template.type
                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {template.type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Wrestlers ({selectedWrestlers.length} selected)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-64 overflow-y-auto p-2 bg-white rounded-lg">
                {wrestlers.map((wrestler) => (
                  <button
                    key={wrestler.id}
                    onClick={() => toggleWrestlerSelection(wrestler.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedWrestlers.includes(wrestler.id)
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {wrestler.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={selectedWrestlers.length === 0}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Generate Storyline
            </button>
          </div>

          {storylines.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Recent Generations</h3>
              <div className="space-y-4">
                {storylines.slice(0, 3).map((storyline) => (
                  <StorylineCard
                    key={storyline.id}
                    storyline={storyline}
                    wrestlers={wrestlers}
                    onDelete={handleDelete}
                    onToggleFavorite={toggleFavorite}
                    getTypeColor={getTypeColor}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          {storylines.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No storylines generated yet. Create your first one!</p>
            </div>
          ) : (
            storylines.map((storyline) => (
              <StorylineCard
                key={storyline.id}
                storyline={storyline}
                wrestlers={wrestlers}
                onDelete={handleDelete}
                onToggleFavorite={toggleFavorite}
                getTypeColor={getTypeColor}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

function StorylineCard({
  storyline,
  wrestlers,
  onDelete,
  onToggleFavorite,
  getTypeColor,
}: {
  storyline: Storyline;
  wrestlers: Wrestler[];
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, current: boolean) => void;
  getTypeColor: (type: string) => string;
}) {
  const participantIds = (storyline.participants as string[]) || [];
  const participantNames = participantIds.map(id => {
    const wrestler = wrestlers.find(w => w.id === id);
    return wrestler?.name || 'Unknown';
  });

  const steps = (storyline.execution_steps as string[]) || [];

  return (
    <div className={`border-2 rounded-lg p-4 ${getTypeColor(storyline.type)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold">{storyline.title}</h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white bg-opacity-50">
              {storyline.type}
            </span>
          </div>
          <p className="text-sm mb-2 font-medium">{storyline.description}</p>
          {participantNames.length > 0 && (
            <p className="text-sm font-semibold">
              Featuring: {participantNames.join(', ')}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleFavorite(storyline.id, storyline.favorited)}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded transition-colors"
          >
            <Star
              className={`w-5 h-5 ${storyline.favorited ? 'fill-current text-yellow-500' : 'text-gray-600'}`}
            />
          </button>
          <button
            onClick={() => onDelete(storyline.id)}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded transition-colors"
          >
            <Trash2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {steps.length > 0 && (
        <div className="mt-4 bg-white bg-opacity-50 rounded-lg p-4">
          <h4 className="font-bold text-sm mb-2">Execution Plan:</h4>
          <ol className="space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm">
                <span className="font-bold text-gray-600 min-w-[24px]">{index + 1}.</span>
                <span className="text-gray-800">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
