import { useState, useEffect } from 'react';
import { Users, Plus, Edit2, Trash2, Award } from 'lucide-react';
import rosterData from '../data/roster.json';
// Removed supabase dependency; using static roster data.

interface Wrestler {
  id: string;
  name: string;
  brand: string;
  alignment: string;
  status: string;
  title?: string | null;
  bio?: string | null;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export function RosterManager() {
  const [wrestlers, setWrestlers] = useState<Wrestler[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: 'RAW',
    alignment: 'Face',
    status: 'Active',
    title: '',
    bio: '',
  });

  useEffect(() => {
    // Load static roster data on mount
    setWrestlers(rosterData);
  }, []);


  // The following CRUD operations are retained for future supabase integration but are currently no-ops for static data.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend update; just update local state
    if (editingId) {
      setWrestlers(prev => prev.map(w => w.id === editingId ? { ...w, ...formData, updated_at: new Date().toISOString() } : w));
    } else {
      const newWrestler = { ...formData, id: Date.now().toString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as any;
      setWrestlers(prev => [...prev, newWrestler]);
    }
    resetForm();
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to remove this wrestler?')) {
      setWrestlers(prev => prev.filter(w => w.id !== id));
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      brand: 'RAW',
      alignment: 'Face',
      status: 'Active',
      title: '',
      bio: '',
    });
    setIsAdding(false);
    setEditingId(null);
  }

  function startEdit(wrestler: Wrestler) {
    setFormData({
      name: wrestler.name,
      brand: wrestler.brand,
      alignment: wrestler.alignment,
      status: wrestler.status,
      title: wrestler.title || '',
      bio: wrestler.bio || '',
    });
    setEditingId(wrestler.id);
    setIsAdding(true);
  }

  const getAlignmentColor = (alignment: string) => {
    switch (alignment) {
      case 'Face': return 'bg-blue-100 text-blue-800';
      case 'Heel': return 'bg-red-100 text-red-800';
      case 'Tweener': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case 'RAW': return 'bg-red-500';
      case 'SmackDown': return 'bg-blue-500';
      case 'NXT': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">WWE Roster</h2>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Wrestler
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Wrestler Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
            <select
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="RAW">RAW</option>
              <option value="SmackDown">SmackDown</option>
              <option value="NXT">NXT</option>
            </select>
            <select
              value={formData.alignment}
              onChange={(e) => setFormData({ ...formData, alignment: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="Face">Face</option>
              <option value="Heel">Heel</option>
              <option value="Tweener">Tweener</option>
            </select>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Injured">Injured</option>
              <option value="Champion">Champion</option>
            </select>
            <input
              type="text"
              placeholder="Title (if any)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
            <textarea
              placeholder="Bio / Character Description"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none md:col-span-2"
              rows={2}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {editingId ? 'Update' : 'Add'} Wrestler
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wrestlers.map((wrestler) => (
          <div
            key={wrestler.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-1 h-6 ${getBrandColor(wrestler.brand)} rounded`} />
                  <h3 className="font-bold text-lg text-gray-900">{wrestler.name}</h3>
                  {wrestler.title && (
                    <Award className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getAlignmentColor(wrestler.alignment)}`}>
                    {wrestler.alignment}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-800">
                    {wrestler.brand}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => startEdit(wrestler)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(wrestler.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {wrestler.title && (
              <p className="text-sm font-semibold text-yellow-600 mb-1">
                {wrestler.title}
              </p>
            )}
            {wrestler.bio && (
              <p className="text-sm text-gray-600 line-clamp-2">{wrestler.bio}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">Status: {wrestler.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
