import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ForecastCard from '../components/ForecastCard';
import WeatherChart from '../components/WeatherChart';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getForecast, groupForecastByDay } from '../Services/WeatherService';

export default function Forecast() {
  const location = useLocation();
  const [city, setCity] = useState(location.state?.city || '');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('temperature');

  const fetchForecast = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getForecast(searchCity);
      setForecast(data);
      setCity(searchCity);
    } catch (e) {
      setError(e.response?.data?.message || 'Could not fetch forecast. Try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) fetchForecast(city);
  }, [city]);

  const grouped = forecast ? groupForecastByDay(forecast.list) : {};
  const todayItems = Object.values(grouped)[0] || [];

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">5-Day Forecast</h1>
          <p className="text-slate-400">Extended weather outlook for any city</p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={fetchForecast} loading={loading} placeholder="Search city for forecast..." />
        </div>

        {loading && <Loader message="Loading forecast data..." />}
        {error && !loading && <ErrorMessage message={error} onRetry={() => city && fetchForecast(city)} />}

        {forecast && !loading && !error && (
          <div className="space-y-6">
            {/* City Header */}
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl font-bold text-white">{forecast.city.name}, {forecast.city.country}</h2>
                <p className="text-slate-400 text-sm">Population: {forecast.city.population?.toLocaleString()}</p>
              </div>
            </div>

            {/* Daily Forecast Cards */}
            <div>
              <h3 className="text-slate-400 text-sm uppercase tracking-wider font-medium mb-3">Daily Outlook</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {Object.entries(grouped).slice(0, 5).map(([day, items]) => (
                  <ForecastCard key={day} day={day} items={items} />
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Today's Chart</h3>
                <div className="flex gap-2">
                  {['temperature', 'precipitation'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setChartType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                        chartType === t
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <WeatherChart data={todayItems} type={chartType} />
            </div>

            {/* Hourly Breakdown */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <h3 className="text-white font-semibold mb-4">Hourly Breakdown</h3>
              <div className="overflow-x-auto -mx-2 px-2 scrollbar-hide">
                <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
                  {todayItems.map((item) => {
                    const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    return (
                      <div key={item.dt} className="flex flex-col items-center gap-2 glow-card rounded-xl p-3 min-w-18">
                        <p className="text-slate-400 text-xs">{time}</p>
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                          alt=""
                          className="w-8 h-8"
                        />
                        <p className="text-white font-semibold text-sm">{Math.round(item.main.temp)}°</p>
                        {item.pop > 0 && (
                          <p className="text-sky-400 text-xs">{Math.round(item.pop * 100)}%</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {!forecast && !loading && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌤️</div>
            <p className="text-slate-400">Search for a city to see the forecast</p>
          </div>
        )}
      </div>
    </div>
  );
}
