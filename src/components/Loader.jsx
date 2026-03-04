import React from 'react';

export default function Loader({ message = 'Fetching weather data...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
      <p className="text-slate-400 text-sm animate-pulse">{message}</p>
    </div>
  );
}
