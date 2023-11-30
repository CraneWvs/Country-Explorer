// 在 Info/CountryCard.jsx 文件中

import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CountryCard = ({ country, onSelect }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardActionArea onClick={() => onSelect(country)}>
        <CardMedia
            component="img"
            height="140px"
            image={country.flags.svg}
            alt={`Flag of ${country.flags.alt}`}
            style={{ objectFit: 'contain', width: '100%', height: '140px' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {country.name.common}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
