import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const BranchesTable = ({ branches }) => {
  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Address</th>
          <th>City</th>
          <th>Area</th>
        </tr>
      </thead>
      <tbody>
        {branches.map(branch => (
          <tr key={branch.store_id}>
            <td>{branch.store_id}</td>
            <td>{branch.store_title}</td>
            <td>{branch.store_address}</td>
            <td>{branch.city}</td>
            <td>{branch.store_region}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BranchesTable;