// 在 Info/CountryDetailCard.jsx 文件中

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const CountryDetailCard = ({ country }) => {

  const renderCurrencies = () => {
    if (!country || !country.currencies) {
      return "N/A";
    }
    const currencyCodes = Object.keys(country.currencies);
    return currencyCodes.join(" ");
  };

  const renderLanguages = () => {
    if (!country || !country.languages) {
      return "N/A";
    }

    const languageNames = Object.values(country.languages);
    return languageNames.join(" ");
  };

  const getLatestGiniIndex = () => {
    if (!country || !country.gini) {
      return "N/A";
    }

    const years = Object.keys(country.gini).map(Number);
    const latestYear = Math.max(...years); 
    const giniIndex = country.gini[latestYear];

    return `${giniIndex} (${latestYear})`;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140px"
        image={country.flags.svg}
        alt={`Flag of ${country.flags.alt}`}
        style={{ objectFit: 'contain', width: '100%', height: '140px' }}
      />
      <CardContent>
        <Grid container justify="center" alignItems="center" style={{ marginBottom: '10px' }}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              {country.name.common}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Official Name: {country.name.official}
        </Typography>
        <Grid container justify="center" style={{ marginBottom: '10px' }}>
          <Typography variant="body1" component="span">
            National Emblem: 
          </Typography>
          {country.coatOfArms.svg && (
            <CardMedia
              component="img"
              image={country.coatOfArms.svg}
              alt={`Coat of Arms of ${country.name.common}`}
              style={{ width: '25px', height: 'auto', marginLeft: '10px' }}
            />
          )}
        </Grid>
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Region: {country.region}
        </Typography>
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Subregion: {country.subregion}
        </Typography>
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Capital: {country.capital ? country.capital[0] : 'N/A'}
        </Typography>
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Area: {country.area.toLocaleString()}
        </Typography>

        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Population: {country.population.toLocaleString()}
        </Typography>

        <Typography variant="body1" style={{ marginTop: '10px' }}>
        Currencies: {renderCurrencies()}
        </Typography>

        <Typography variant="body1" style={{ marginTop: '10px' }}>
        Languages: {renderLanguages()}
        </Typography>

        <Typography variant="body1" style={{ marginTop: '10px' }}>
        Gini Index: {getLatestGiniIndex()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CountryDetailCard;
