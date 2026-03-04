import React from 'react';

// map weather description to FontAwesome icon class
const getIconClass = (condition) => {
  if (condition.includes('Cloud')) return 'fa-cloud';
  if (condition.includes('Rain')) return 'fa-cloud-rain';
  if (condition.includes('Clear')) return 'fa-sun';
  if (condition.includes('Snow')) return 'fa-snowflake';
  if (condition.includes('Thunder')) return 'fa-bolt';
  return 'fa-smog';
};

const getWeatherGradient = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) return 'from-slate-700 to-slate-900'; // thunderstorm
  if (weatherId >= 300 && weatherId < 600) return 'from-slate-600 to-blue-900'; // rain/drizzle
  if (weatherId >= 600 && weatherId < 700) return 'from-slate-300 to-blue-200'; // snow
  if (weatherId >= 700 && weatherId < 800) return 'from-amber-800 to-orange-900'; // atmosphere
  if (weatherId === 800) return 'from-sky-400 to-indigo-600'; // clear
  if (weatherId > 800) return 'from-slate-500 to-slate-700'; // cloudy
  return 'from-sky-400 to-indigo-600';
};

export default function WeatherCard({ data, onRemove }) {
  if (!data) return null;
  const { name, sys, main, weather, wind, visibility } = data;
  const gradient = getWeatherGradient(weather[0].id);

  return (
    <div className={`relative rounded-3xl bg-linear-to-br ${gradient} p-6 shadow-2xl overflow-hidden group`}>
      {/* Background decoration */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 blur-xl" />
      <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-black/10 blur-2xl" />

      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-red-500/80 flex items-center justify-center text-white/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
          aria-label="Remove city"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="relative z-10">
        {/* Location */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <p className="text-white/60 text-sm">{sys?.country}</p>
          </div>
          <i className={`fa-solid ${getIconClass(weather[0].main)} text-4xl text-yellow-400`} />
        </div>

        {/* Temperature */}
        <div className="mb-4">
          <div className="flex items-end gap-2">
            <span className="text-6xl font-light text-white">{Math.round(main.temp)}°</span>
            <span className="text-2xl text-white/60 mb-2">C</span>
          </div>
          <p className="text-white/80 capitalize text-lg">{weather[0].description}</p>
          <p className="text-white/50 text-sm mt-1">
            Feels like {Math.round(main.feels_like)}°C · H:{Math.round(main.temp_max)}° L:{Math.round(main.temp_min)}°
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Humidity', value: `${main.humidity}%`, icon: '💧' },
            { label: 'Wind', value: `${Math.round(wind.speed)} m/s`, icon: '🌬️' },
            { label: 'Visibility', value: `${visibility ? (visibility / 1000).toFixed(1) : 'N/A'} km`, icon: '👁️' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="glow-card rounded-2xl p-3 text-center">
              <div className="text-lg mb-1">{icon}</div>
              <div className="text-white font-semibold text-sm">{value}</div>
              <div className="text-white/50 text-xs">{label}</div>
            </div>
          ))}
        </div>

        {/* sunrise / sunset section */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="glow-card rounded-2xl p-4 text-center">
            <i className="fa-solid fa-sun text-yellow-400"></i>
            <p className="font-semibold mt-2">
              {new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <span className="text-xs opacity-60">Sunrise</span>
          </div>
          <div className="glow-card rounded-2xl p-4 text-center">
            <i className="fa-solid fa-moon text-orange-300"></i>
            <p className="font-semibold mt-2">
              {new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <span className="text-xs opacity-60">Sunset</span>
          </div>
        </div>
      </div>
    </div>
  );
}
