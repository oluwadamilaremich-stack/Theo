import React, { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = 'Search city...', loading = false }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 text-sm backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center backdrop-blur-sm"
        >
          {loading ? '...' : <i className="fa-solid fa-magnifying-glass"></i>}
        </button>
      </div>
    </form>
  );
}

