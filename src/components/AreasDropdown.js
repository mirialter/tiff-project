import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AreasDropdown = ({ areas, handleAreaChange  }) => {

  return (
    <div >
    <select className="form-control"  onChange={handleAreaChange}>
      <option lassName="dropdown-menu" value="">Area</option>
      {areas.map(area => (
        <option key={area} value={area}>{area}</option>
      ))}
    </select>
  </div>
  );
};

export default AreasDropdown;