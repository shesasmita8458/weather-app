import React from 'react';
import './ForecastList.css';

const ForecastList = ({ forecast }) => (
  <ul className="forecast-list">
    {forecast.map((item, idx) => (
      <li key={idx}>
        <p>{item.hour}</p>
        <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="icon" />
        <p>{item.temp}°</p>
      </li>
    ))}
  </ul>
);

export default ForecastList;