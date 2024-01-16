import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AreasDropdown from './components/AreasDropdown';
import CitiesDropdown from './components/CitiesDropdown';
import SearchTextbox from './components/SearchTextbox';
import BranchesTable from './components/BranchesTable';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchText, setSearchText] = useState('');
  // to save the original data:
  const [allBranches, setAllBranches] = useState([]);

  useEffect(() => {
    axios.get('https://mcdonalds-live-engage-api-stage-1.azurewebsites.net/stores.json')
      .then(response => {
        // remove space from begin and end in the city name
        response.data = response.data.map(branch =>({
          ...branch,
          city: trimSpaces(branch.city)
        }))
        setAreas(getUniqueValues(response.data, 'store_region').sort());
        setCities(getUniqueValues(response.data, 'city').sort());
        
        setBranches(response.data);
        setAllBranches(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // function to get uniquevalue
  const getUniqueValues = (data, key) => {
    return [...new Set(data.map(item => item[key]))];
  };

  function trimSpaces(str) {
    let start = 0;
    let end = str.length - 1;
    // Trim spaces from the beginning
    while (start < end && str[start] === ' ') {
      start++;
    }  
    // Trim spaces from the end
    while (end > start && str[end] === ' ') {
      end--;
    }
    // Extract the trimmed substring
    return str.substring(start, end + 1);
  }

  useEffect(() => {
    const filteredBranches = allBranches.filter(branch => {
      return (
        // filter data by the selectedArea
        (!selectedArea || branch.store_region === selectedArea) &&
        // filter data by the selectedCity
        (!selectedCity || branch.city === selectedCity) &&
        // filter data by the text un the searc box
        (branch.store_title.toLowerCase().includes(searchText.toLowerCase()) ||
         branch.store_address.toLowerCase().includes(searchText.toLowerCase()))
      );
    });
    setBranches(filteredBranches);
  }, [selectedArea, selectedCity, searchText]);

  const handleAreaChange = (event) => {
    const selectedArea = event.target.value;
    setSelectedArea(selectedArea);
   
    if(selectedArea) {
      setSelectedCity('') // no city selected
      // Filter cities based on selected area: 
      const filteredCities = allBranches.filter(branch => branch.store_region === selectedArea);
      setCities(getUniqueValues(filteredCities, 'city').sort());
    } else {
      // if no area selected
      setCities(getUniqueValues(allBranches, 'city').sort());
    }
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const handleSearchTextChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
  };
  return (
    <div id="MainView" className=''>
      <h3>Company Branches</h3>
      <div id="selectedFields" className='form-group container'>
        <AreasDropdown areas={areas} handleAreaChange={handleAreaChange} />
        <CitiesDropdown cities={cities} handleCityChange={handleCityChange} />
        <SearchTextbox handleSearchTextChange={handleSearchTextChange} />
      </div>
      <BranchesTable branches={branches}/>
    </div>
  );
}

export default App;
