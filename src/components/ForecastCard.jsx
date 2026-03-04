import React from 'react';
import { getWeatherIconUrl } from '../Services/WeatherService';

export default function ForecastCard({ day, items }) {
  if (!items || items.length === 0) return null;

  const maxTemp = Math.max(...items.map((i) => i.main.temp_max));
  const minTemp = Math.min(...items.map((i) => i.main.temp_min));
  const midItem = items[Math.floor(items.length / 2)];
  const avgPop = Math.round((items.reduce((s, i) => s + (i.pop || 0), 0) / items.length) * 100);

  return (
    <div className="rounded-2xl glow-card p-4 hover:bg-white/10 transition-all group">
      <p className="text-slate-400 text-sm font-medium mb-3">{day}</p>

      <div className="flex items-center justify-between mb-3">
        <img
          src={getWeatherIconUrl(midItem.weather[0].icon)}
          alt={midItem.weather[0].description}
          className="w-12 h-12 drop-shadow-md group-hover:scale-110 transition-transform"
        />
        <div className="text-right">
          <div className="flex items-baseline gap-1">
            <span className="text-white font-bold text-lg">{Math.round(maxTemp)}°</span>
            <span className="text-slate-500 text-sm">{Math.round(minTemp)}°</span>
          </div>
          <p className="text-slate-400 text-xs capitalize">{midItem.weather[0].description}</p>
        </div>
      </div>

      {avgPop > 0 && (
        <div className="flex items-center gap-1.5 text-sky-400 text-xs">
          <span>💧</span>
          <span>{avgPop}% precip.</span>
        </div>
      )}
    </div>
  );
}
