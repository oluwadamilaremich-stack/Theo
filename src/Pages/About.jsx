import React from 'react';

const tech = [
  { name: 'React 18', desc: 'UI component framework', emoji: '⚛️' },
  { name: 'React Router v6', desc: 'Client-side routing', emoji: '🔀' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling', emoji: '🎨' },
  { name: 'Recharts', desc: 'Data visualization', emoji: '📊' },
  { name: 'Axios', desc: 'HTTP client', emoji: '🌐' },
  { name: 'OpenWeather API', desc: 'Real-time weather data', emoji: '🌤️' },
  { name: 'Vite', desc: 'Build tool & dev server', emoji: '⚡' },
  { name: 'LocalStorage', desc: 'Persistent city storage', emoji: '💾' },
];

const features = [
  'Real-time weather for any city worldwide',
  '5-day forecast with hourly breakdown',
  'Interactive temperature & precipitation charts',
  'Save and manage multiple cities',
  'Search history tracking',
  'Geolocation detection',
  'Dark mode toggle',
  'Fully responsive design',
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm mb-4">
            <span>☁️</span> About Deploying
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your personal weather dashboard
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Nimbus is a modern, full-featured weather dashboard built with React
            and powered by the OpenWeather API. It provides real-time weather
            data, extended forecasts, and beautiful visualizations in a clean,
            responsive interface.
          </p>
        </div>

        {/* Features */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Features</h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-2.5 text-slate-300 text-sm">
                <div className="w-5 h-5 mt-0.5 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="leading-snug">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Tech Stack</h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {tech.map(({ name, desc, emoji }) => (
              <div key={name} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 min-w-0">
                <span className="text-2xl shrink-0">{emoji}</span>
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">{name}</p>
                  <p className="text-slate-500 text-xs break-words">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Info */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-3">API Integration</h2>

          <p className="text-slate-400 text-sm mb-3 leading-relaxed">
            Nimbus uses the{' '}
            <strong className="text-white">OpenWeatherMap API</strong> to provide
            current weather data and forecasts. All API calls are abstracted
            through{' '}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-sky-400 text-xs break-words">
              src/Services/WeatherService.js
            </code>.
          </p>

          {/* FIXED CODE BLOCK */}
          <div className="rounded-xl bg-slate-900/80 border border-white/10 p-4 font-mono text-sm overflow-x-auto">
            <p className="text-slate-500 text-xs mb-2"># .env</p>

            <pre className="whitespace-pre-wrap break-all text-sky-400">
VITE_WEATHER_API_KEY=ee81d3520ae6199e41fa61a897b7cd3b
            </pre>
          </div>

          <p className="text-slate-500 text-xs mt-3 break-words">
            Get your free API key at{' '}
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline break-all"
            >
              openweathermap.org/api
            </a>
          </p>
        </div>

        {/* Folder Structure */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-3">Project Structure</h2>
          <div className="rounded-xl bg-slate-900/80 border border-white/10 p-4 font-mono text-xs text-slate-400 space-y-1">
            <p><span className="text-sky-400">src/</span></p>
            <p className="ml-4"><span className="text-indigo-400">├── components/</span> <span className="text-slate-600"># Reusable UI components</span></p>
            <p className="ml-4"><span className="text-indigo-400">├── pages/</span> <span className="text-slate-600"># Route-level pages</span></p>
            <p className="ml-4"><span className="text-indigo-400">├── services/</span> <span className="text-slate-600"># API abstraction layer</span></p>
            <p className="ml-4"><span className="text-green-400">├── App.jsx</span> <span className="text-slate-600"># Router & layout</span></p>
            <p className="ml-4"><span className="text-green-400">└── main.jsx</span> <span className="text-slate-600"># App entry point</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}