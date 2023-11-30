import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CountryCard from './CountryCard';
import CountryDetailCard from './CountryDetailCard';
import './Info.css';

const Info = ({selectedCountryISO, setSelectedCountryISO}) => {
  const [countryQuery, setCountryQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);  // 新的状态变量

  const handleISOChange = async () => {
    if (!selectedCountryISO) {
        setCountries([]);
        setSelectedCountry(null);
        setShowDetails(false);
        return;
    }

    setLoading(true);
    setShowDetails(true);  // 隐藏详情
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/countries/code/${selectedCountryISO}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      // setCountries(data);
      setSelectedCountry(data[0]);
    } catch (error) {
      setError('Failed to fetch data');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    handleISOChange();

}, [selectedCountryISO]);

  const handleSearch = async () => {
    if (!countryQuery) {
        setCountries([]);
        setSelectedCountry(null);
        setShowDetails(false);
        return;
    }

    setLoading(true);
    setShowDetails(false);  // 隐藏详情
    setError(null);
    try {
      // const response = await fetch(`https://restcountries.com/v3.1/name/${countryQuery}`);
      const response = await fetch(`http://localhost:3001/api/countries/name/${countryQuery}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCountries(data);
      setSelectedCountry(null);
    } catch (error) {
      setError('Failed to fetch data');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setShowDetails(true);  // 显示详情并隐藏国家列表
    setSelectedCountryISO(country.cca3);
  };

  const handleBackToList = () => {
    setShowDetails(false);  // 显示国家列表
    setSelectedCountry(null);
    // setSelectedCountryISO(null);
  };

  return (
    <div className="info-container">
      <div className="search-bar">
        <TextField
          label="Search country"
          variant="outlined"
          value={countryQuery}
          onChange={(e) => setCountryQuery(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </div>
      {showDetails ? (
        <div className="info-display">
          {selectedCountry && <CountryDetailCard country={selectedCountry} />}
          <Button variant="text" onClick={handleBackToList}>
            Back
          </Button>
        </div>
      ) : (
        <div className="countries-list">
          {loading && <CircularProgress />}
          {error && <div>Error: {error}</div>}
          {countries.map((country, index) => (
            <CountryCard key={index} country={country} onSelect={handleSelectCountry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Info;
