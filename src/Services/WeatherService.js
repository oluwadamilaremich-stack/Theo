

import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'ee81d3520ae6199e41fa61a897b7cd3b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

const api = axios.create({ baseURL: BASE_URL });

export const getCurrentWeather = async (city) => {
  const response = await api.get('/weather', {
    params: { q: city, appid: API_KEY, units: 'metric' },
  });
  return response.data;
};

export const getForecast = async (city) => {
  const response = await api.get('/forecast', {
    params: { q: city, appid: API_KEY, units: 'metric', cnt: 40 },
  });
  return response.data;
};

export const getWeatherByCoords = async (lat, lon) => {
  const response = await api.get('/weather', {
    params: { lat, lon, appid: API_KEY, units: 'metric' },
  });
  return response.data;
};

export const getForecastByCoords = async (lat, lon) => {
  const response = await api.get('/forecast', {
    params: { lat, lon, appid: API_KEY, units: 'metric', cnt: 40 },
  });
  return response.data;
};

export const getWeatherIconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const groupForecastByDay = (list) => {
  const days = {};
  list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
    });
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return days;
};
