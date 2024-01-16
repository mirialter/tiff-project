import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const CitiesDropdown = ({ cities, handleCityChange }) => {
  
  // dropdown to select the city
  return (
    <div>
      <select className="form-control" onChange={handleCityChange}>
        <option value="">City</option>
        {cities && cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default CitiesDropdown;