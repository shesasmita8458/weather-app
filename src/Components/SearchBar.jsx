import React from 'react';
import './SearchBar.css';

const SearchBar = ({ city, setCity, onSearch, onLocation }) => (
  <form className="search-form" onSubmit={onSearch}>
    <span className="icon"><i className="fa-solid fa-magnifying-glass"></i></span>
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city name"
      className="search-input"
      required
    />
    <button type="button" className="location-button" onClick={onLocation}>
      <i className="fa-solid fa-location-crosshairs"></i>
    </button>
  </form>
);

export default SearchBar;