import React, { useState, useEffect } from 'react';
import WeatherCard from './Components/WeatherCard';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_KEY = 'ba867415b1d4d6c81cb9fcb2f773e061'; // Replace with your key

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      setWeather({
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),   
          humidity: data.main.humidity,                  
          wind: data.wind.speed,                        
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });

      const hourly = forecastData.list.slice(0, 5).map((item) => ({
        hour: new Date(item.dt * 1000).getHours() + ':00',
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
      }));

      setForecast(hourly);
    } catch (err) {
      setError('Failed to fetch weather.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const handleClear = () => {
    setCity('');
    setWeather(null);
    setForecast([]);
    setError('');
  };

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await res.json();
          setCity(data.name);
          fetchWeather(data.name);
        },
        () => {
          fetchWeather('London');
        }
      );
    } else {
      fetchWeather('London');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="app">
      <WeatherCard
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        onClear={handleClear}
        onLocation={getCurrentLocation}
        weather={weather}
        forecast={forecast}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default App;
