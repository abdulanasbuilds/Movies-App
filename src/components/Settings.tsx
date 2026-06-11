import React, { useState, useEffect } from 'react';
import { Save, Key, ShieldCheck, AlertCircle } from 'lucide-react';

export const Settings: React.FC = () => {
  const [tmdbKey, setTmdbKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    const savedKey = localStorage.getItem('tmdb_api_key');
    if (savedKey) setTmdbKey(savedKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem('tmdb_api_key', tmdbKey);
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
          <Key className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">SETTINGS</h1>
          <p className="text-gray-500">Manage your API keys and application preferences.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
            API Configuration
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2 ml-1">
                TMDB API Key (v3 auth)
              </label>
              <div className="relative group">
                <input
                  type="password"
                  value={tmdbKey}
                  onChange={(e) => setTmdbKey(e.target.value)}
                  placeholder="Paste your TMDB API Key here..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-700"
                />
              </div>
              <p className="mt-2 text-xs text-gray-600 ml-1">
                You can get your API key from <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TMDB Settings</a>.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
              disabled={status === 'saved'}
            >
              {status === 'saved' ? (
                <>
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Saved Successfully
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200/60 leading-relaxed">
            <p className="font-bold text-blue-400 mb-1">Privacy Note</p>
            Your API keys are stored locally in your browser's <code className="bg-blue-500/10 px-1 rounded">localStorage</code>. They are never sent to our servers. AniList API does not require a key for basic metadata.
          </div>
        </div>
      </div>
    </div>
  );
};
