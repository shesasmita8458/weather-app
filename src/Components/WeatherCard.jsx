import React from 'react';

const WeatherCard = ({
  city,
  setCity,
  onSearch,
  onClear,
  onLocation,
  weather,
  forecast,
  loading,
  error,
}) => {
  // Helper to capitalize first letter of description
  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div className="weather-card">
      <form className="search-bar" onSubmit={onSearch}>
        <button type="submit" className="icon-btn" title="Search">
          <i className="fas fa-search"></i>
        </button>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city"
        />
        <button type="button" className="icon-btn" onClick={onClear} title="Clear">
          <i className="fas fa-times"></i>
        </button>
        <button type="button" className="icon-btn" onClick={onLocation} title="Use my location">
          <i className="fas fa-location-arrow"></i>
        </button>
      </form>

      {loading ? (
        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : weather ? (
        <>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
          />
          <div className="weather-temp">{weather.temp}°C</div>

          {/* ✅ Capitalized weather description */}
          <div className="weather-desc">{capitalize(weather.description)}</div>

          <div className="weather-extra">
            <div><i className="fas fa-thermometer-half"></i> Feels Like: {weather.feelsLike}°C</div>
            <div><i className="fas fa-tint"></i> Humidity: {weather.humidity}%</div>
            <div><i className="fas fa-wind"></i> Wind: {weather.wind} m/s</div>
          </div>
        </>
      ) : null}

      {!loading && forecast.length > 0 && (
        <div className="forecast-list">
          {forecast.map((item, index) => (
            <div key={index} className="forecast-item">
              <div className="hour">{item.hour}</div>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt="forecast"
              />
              <div className="temp">{item.temp}°</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
