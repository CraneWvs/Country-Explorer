import React, { useState, useEffect } from 'react';
import './Content.css'; 
import Info from './Info/Info'; 
import Map from './Map/Map'; 

const Content = () => {
    const [selectedCountryISO, setSelectedCountryISO] = useState(null);

    return (
        <div className="content">
        <div className="info-area">
            <Info  selectedCountryISO={selectedCountryISO} setSelectedCountryISO={setSelectedCountryISO}/> 
        </div>
        <div className="map-area" >
            <Map selectedCountryISO={selectedCountryISO} setSelectedCountryISO={setSelectedCountryISO}/>
        </div>
        </div>
    );
};

export default Content;

