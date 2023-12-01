import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CountryCard from './CountryCard';
import CountryDetailCard from './CountryDetailCard';
import './Info.css';
import { Typography } from '@mui/material';

const baseURL = import.meta.env.VITE_API_BASE_URL;


const Info = ({selectedCountryISO, setSelectedCountryISO}) => {
  const [countryQuery, setCountryQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  

  const handleISOChange = async () => {
    if (!selectedCountryISO) {
        setCountries([]);
        setSelectedCountry(null);
        setShowDetails(false);
        return;
    }

    setLoading(true);
    setShowDetails(true);
    setError(null);
    try {
      const response = await fetch(`${baseURL}/api/countries/code/${selectedCountryISO}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
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
    setShowDetails(false);
    setError(null);
    try {
      const response = await fetch(`${baseURL}/api/countries/name/${countryQuery}`);
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
    setShowDetails(true);
    setSelectedCountryISO(country.cca3);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedCountry(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="info-display">
        <CircularProgress />
        </div>
      )
    }
    if (error) {
      return (
        <div className="info-display">
          <Typography variant='h5'>Something Wrong Happened...</Typography>
          <Typography variant='h6'>( {error})</Typography>
      </div>
      );
    }

    if (showDetails) {
      return (
        <div className="info-display">
        {selectedCountry && <CountryDetailCard country={selectedCountry} />}
        <Button variant="text" onClick={handleBackToList}>
          Back
        </Button>
      </div>
      );
    }

    return (
      <div className="countries-list">
      {countries.map((country, index) => (
        <CountryCard key={index} country={country} onSelect={handleSelectCountry} />
      ))}
    </div>
    );

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
      {renderContent()}
    </div>
  );
};

export default Info;
