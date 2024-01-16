import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const SearchTextbox = ({ handleSearchTextChange }) => {
  return (
    <div>
      <input  className='form-control' type="text" onChange={handleSearchTextChange} placeholder="Free text search" />
    </div>
  );
};

export default SearchTextbox;
