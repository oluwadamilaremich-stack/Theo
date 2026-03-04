import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getCurrentWeather } from '../Services/WeatherService';

const CITIES_KEY = 'nimbus_saved_cities';
const DEFAULT_CITIES = ['New York', 'London', 'Tokyo', 'Sydney'];

export default function Cities() {
  const [savedCities, setSavedCities] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(CITIES_KEY) || 'null');
      return stored || DEFAULT_CITIES;
    } catch { return DEFAULT_CITIES; }
  });
  const [weatherData, setWeatherData] = useState({});
  const [loadingCities, setLoadingCities] = useState(new Set());
  const [errors, setErrors] = useState({});

  const fetchCityWeather = useCallback(async (city) => {
    setLoadingCities((prev) => new Set([...prev, city]));
    try {
      const data = await getCurrentWeather(city);
      setWeatherData((prev) => ({ ...prev, [city]: data }));
      setErrors((prev) => { const n = { ...prev }; delete n[city]; return n; });
    } catch (e) {
      setErrors((prev) => ({ ...prev, [city]: 'Failed to load' }));
    } finally {
      setLoadingCities((prev) => { const n = new Set(prev); n.delete(city); return n; });
    }
  }, []);

  useEffect(() => {
    savedCities.forEach((city) => {
      if (!weatherData[city]) fetchCityWeather(city);
    });
  }, [savedCities]);

  const addCity = async (city) => {
    const normalized = city.trim();
    if (savedCities.some((c) => c.toLowerCase() === normalized.toLowerCase())) return;
    const newCities = [...savedCities, normalized];
    setSavedCities(newCities);
    localStorage.setItem(CITIES_KEY, JSON.stringify(newCities));
  };

  const removeCity = (city) => {
    const newCities = savedCities.filter((c) => c !== city);
    setSavedCities(newCities);
    localStorage.setItem(CITIES_KEY, JSON.stringify(newCities));
    setWeatherData((prev) => { const n = { ...prev }; delete n[city]; return n; });
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">My Cities</h1>
            <p className="text-slate-400">Track weather across {savedCities.length} cities</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
            {savedCities.length}
          </div>
        </div>

        {/* Add City */}
        <div className="mb-8 rounded-2xl bg-white/5 border border-white/10 p-5">
          <h2 className="text-white font-semibold mb-3">Add a City</h2>
          <SearchBar onSearch={addCity} placeholder="Search and add a city..." />
        </div>

        {/* Cities Grid */}
        {savedCities.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏙️</div>
            <p className="text-slate-400">No cities saved yet. Search for a city above to add it.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {savedCities.map((city) => (
              <div key={city}>
                {loadingCities.has(city) ? (
                  <div className="rounded-3xl bg-white/5 border border-white/10 p-6 flex items-center justify-center min-h-70">
                    <Loader message={`Loading ${city}...`} />
                  </div>
                ) : errors[city] ? (
                  <div className="rounded-3xl bg-white/5 border border-white/10 p-6 min-h-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">{city}</h3>
                      <button onClick={() => removeCity(city)} className="text-slate-500 hover:text-red-400 transition-colors text-xs">Remove</button>
                    </div>
                    <ErrorMessage message={errors[city]} onRetry={() => fetchCityWeather(city)} />
                  </div>
                ) : weatherData[city] ? (
                  <WeatherCard
                    data={weatherData[city]}
                    onRemove={() => removeCity(city)}
                  />
                ) : null}
              </div>
            ))}
          </div>
        )}

        {/* Refresh All */}
        {savedCities.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => savedCities.forEach(fetchCityWeather)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white text-sm hover:bg-white/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
