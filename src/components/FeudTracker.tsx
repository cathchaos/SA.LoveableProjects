import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Zap, Plus, Trash2, Flame } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Wrestler = Database['public']['Tables']['wrestlers']['Row'];
type Feud = Database['public']['Tables']['feuds']['Row'] & {
  wrestler1?: Wrestler;
  wrestler2?: Wrestler;
};

export function FeudTracker() {
  const [feuds, setFeuds] = useState<Feud[]>([]);
  const [wrestlers, setWrestlers] = useState<Wrestler[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    wrestler1_id: '',
    wrestler2_id: '',
    description: '',
    intensity: 'Medium',
    status: 'Active',
  });

  useEffect(() => {
    loadFeuds();
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

  async function loadFeuds() {
    const { data, error } = await supabase
      .from('feuds')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const feudsWithWrestlers = await Promise.all(
        data.map(async (feud) => {
          const [w1, w2] = await Promise.all([
            supabase.from('wrestlers').select('*').eq('id', feud.wrestler1_id).maybeSingle(),
            supabase.from('wrestlers').select('*').eq('id', feud.wrestler2_id).maybeSingle(),
          ]);
          return {
            ...feud,
            wrestler1: w1.data || undefined,
            wrestler2: w2.data || undefined,
          };
        })
      );
      setFeuds(feudsWithWrestlers);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.wrestler1_id === formData.wrestler2_id) {
      alert('Please select two different wrestlers');
      return;
    }

    await supabase.from('feuds').insert([formData]);

    resetForm();
    loadFeuds();
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to end this feud?')) {
      await supabase.from('feuds').delete().eq('id', id);
      loadFeuds();
    }
  }

  function resetForm() {
    setFormData({
      wrestler1_id: '',
      wrestler2_id: '',
      description: '',
      intensity: 'Medium',
      status: 'Active',
    });
    setIsAdding(false);
  }

  const getIntensityColor = (intensity: string) => {
    switch(intensity) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getIntensityFlames = (intensity: string) => {
    switch(intensity) {
      case 'Low': return 1;
      case 'Medium': return 2;
      case 'High': return 3;
      default: return 1;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900">Current Feuds</h2>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Feud
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={formData.wrestler1_id}
              onChange={(e) => setFormData({ ...formData, wrestler1_id: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            >
              <option value="">Select Wrestler 1</option>
              {wrestlers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.alignment})
                </option>
              ))}
            </select>
            <select
              value={formData.wrestler2_id}
              onChange={(e) => setFormData({ ...formData, wrestler2_id: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            >
              <option value="">Select Wrestler 2</option>
              {wrestlers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.alignment})
                </option>
              ))}
            </select>
            <select
              value={formData.intensity}
              onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="Low">Low Intensity</option>
              <option value="Medium">Medium Intensity</option>
              <option value="High">High Intensity</option>
            </select>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Resolved">Resolved</option>
            </select>
            <textarea
              placeholder="Feud Description / Storyline"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none md:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Create Feud
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {feuds.map((feud) => (
          <div
            key={feud.id}
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-yellow-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {feud.wrestler1?.name || 'Unknown'} vs {feud.wrestler2?.name || 'Unknown'}
                  </h3>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: getIntensityFlames(feud.intensity) }).map((_, i) => (
                      <Flame key={i} className={`w-5 h-5 ${getIntensityColor(feud.intensity)} fill-current`} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                    {feud.wrestler1?.alignment || 'Unknown'}
                  </span>
                  <span className="text-gray-400">vs</span>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-800">
                    {feud.wrestler2?.alignment || 'Unknown'}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    feud.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {feud.status}
                  </span>
                </div>
                {feud.description && (
                  <p className="text-gray-700 mt-2">{feud.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(feud.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {feuds.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Zap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No active feuds. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
