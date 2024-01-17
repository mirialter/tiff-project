import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AreasDropdown = ({ areas, handleAreaChange  }) => {

  // dropdown to select the area
  return (
    <div >
    <select className="form-control"  onChange={handleAreaChange}>
      <option value="">Area</option>
      {areas.map(area => (
        <option key={area} value={area}>{area}</option>
      ))}
    </select>
  </div>
  );
};

export default AreasDropdown;