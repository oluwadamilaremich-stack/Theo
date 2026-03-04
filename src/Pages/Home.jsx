import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getCurrentWeather, getWeatherByCoords } from '../Services/WeatherService';

const SEARCH_HISTORY_KEY = 'nimbus_search_history';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]'); }
    catch { return []; }
  });

  const navigate = useNavigate();

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentWeather(city);
      setWeather(data);

      const newHistory = [
        city,
        ...searchHistory.filter(h => h.toLowerCase() !== city.toLowerCase())
      ].slice(0, 5);

      setSearchHistory(newHistory);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (e) {
      setError(e.response?.data?.message || 'City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchByGeolocation = () => {
    if (!navigator.geolocation) return;

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const data = await getWeatherByCoords(coords.latitude, coords.longitude);
          setWeather(data);
        } catch {
          setError('Failed to fetch weather for your location.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location access denied.');
        setLoading(false);
      }
    );
  };

  // Load last searched city
  useEffect(() => {
    if (searchHistory.length > 0 && !weather) {
      fetchWeather(searchHistory[0]);
    }
  }, []);

  // Weather Icon
  const getIconClass = (condition) => {
    if (condition.includes('Cloud')) return 'fa-cloud';
    if (condition.includes('Rain')) return 'fa-cloud-rain';
    if (condition.includes('Clear')) return 'fa-sun';
    if (condition.includes('Snow')) return 'fa-snowflake';
    if (condition.includes('Thunder')) return 'fa-bolt';
    return 'fa-smog';
  };

  // Clock
  const [cityClock, setCityClock] = useState('');
  const [cityDate, setCityDate] = useState('');

  useEffect(() => {
    if (!weather) return;

    const tick = () => {
      const nowUTC = new Date();
      const utcMs = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
      const dt = new Date(utcMs + weather.timezone * 1000);

      setCityClock(
        dt.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );

      setCityDate(
        dt.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      );
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [weather]);

  return (
    <div className="min-h-screen text-white relative">

      {/* ================= FIXED SEARCH BAR ================= */}
      <div className="fixed top-24 left-0 right-0 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <SearchBar
            onSearch={fetchWeather}
            loading={loading}
            placeholder="Search city..."
          />
          <button
            onClick={fetchByGeolocation}
            className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition"
          >
            <i className="fa-solid fa-location-dot"></i>
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="pt-44 px-4 pb-10">
        <div className="max-w-md mx-auto text-center space-y-8">

          {/* Search History */}
          {searchHistory.length > 0 && !loading && !weather && (
            <div>
              <p className="text-slate-500 text-xs mb-2 uppercase tracking-wider font-medium">
                Recent Searches
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {searchHistory.map((city) => (
                  <button
                    key={city}
                    onClick={() => fetchWeather(city)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 hover:text-white transition-all"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && <Loader />}

          {error && !loading && (
            <ErrorMessage
              message={error}
              onRetry={() => weather && fetchWeather(weather.name)}
            />
          )}

          {/* Weather Result */}
          {weather && !loading && !error && (
            <div className="animate-fade-in space-y-6">

              <div>
                <h2 className="text-lg font-semibold">
                  {weather.name}, {weather.sys.country}
                </h2>
                <p className="text-sm opacity-70">{cityDate}</p>
                <p className="text-sm opacity-70">{cityClock}</p>
              </div>

              <div className="text-7xl text-yellow-400">
                <i className={`fa-solid ${getIconClass(weather.weather[0].main)}`} />
              </div>

              <div>
                <h1 className="text-6xl font-bold">
                  {Math.round(weather.main.temp)}°C
                </h1>
                <p className="text-lg capitalize opacity-80">
                  {weather.weather[0].description}
                </p>
                <p className="text-sm opacity-60">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
              </div>

              <WeatherCard data={weather} />

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    navigate('/forecast', { state: { city: weather.name } })
                  }
                  className="rounded-2xl bg-white/5 border border-white/10 p-4 text-left hover:bg-white/10 transition-all"
                >
                  <div className="text-2xl mb-2">📅</div>
                  <p className="text-white font-medium text-sm">
                    5-Day Forecast
                  </p>
                  <p className="text-slate-500 text-xs">
                    Extended weather outlook
                  </p>
                </button>

                <button
                  onClick={() => {
                    const saved = JSON.parse(
                      localStorage.getItem('nimbus_saved_cities') || '[]'
                    );
                    if (!saved.includes(weather.name)) {
                      localStorage.setItem(
                        'nimbus_saved_cities',
                        JSON.stringify([...saved, weather.name])
                      );
                    }
                    navigate('/cities');
                  }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-4 text-left hover:bg-white/10 transition-all"
                >
                  <div className="text-2xl mb-2">⭐</div>
                  <p className="text-white font-medium text-sm">
                    Save City
                  </p>
                  <p className="text-slate-500 text-xs">
                    Add to your city list
                  </p>
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}