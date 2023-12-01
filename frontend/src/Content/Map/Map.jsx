
import './Map.css'
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


function Map({selectedCountryISO, setSelectedCountryISO}) {

    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const layerMappingRef = useRef({});
    const [selectedCountryMap, setSelectedCountryMap] = useState(null);
    const selectedCountryMapRef = useRef(null);

    const defaultStyle = {
        fillColor: "#2596be",
        weight: 0.5,
        opacity: 1,
        color: "white",
        fillOpacity: 0.5
    };
      
    const hoverStyle = {
        fillColor: "#1976d2",
        fillOpacity: 0.7,
        weight: 0.5,
        color: 'white',
        dashArray: '',
        opacity: 0.5
    };

    const selectedStyle = {
        fillColor: "#F0ECE5",
        fillOpacity: 0.2,
        weight: 3,
        color: 'black',
        dashArray: '',
        opacity: 0.2
    };  

    useEffect(() => {
        if (!mapInstanceRef.current) {
            return;
          }
        let iso_a3_id = null;
        if (selectedCountryMap) {
            iso_a3_id = selectedCountryMap.feature.properties.iso_a3;
        }
        setSelectedCountryISO(iso_a3_id);
    }, [selectedCountryMap]);

    useEffect(() => {
        if (!mapInstanceRef.current) {
            return;
          }
        if (selectedCountryMapRef.current) {
            selectedCountryMapRef.current.setStyle(defaultStyle);
        }
        const newLayer = layerMappingRef.current[selectedCountryISO];
        
        setSelectedCountryMap(newLayer);
        selectedCountryMapRef.current = newLayer;
        if (newLayer) {
            newLayer.setStyle(selectedStyle);
            mapInstanceRef.current.fitBounds(newLayer.getBounds());
        } else {
            mapInstanceRef.current.setView([51.505, -0.09], 2);
        }
        
  
    }, [selectedCountryISO]);

    useEffect(() => {

        if (mapRef.current && !mapInstanceRef.current) {
            const map = L.map(mapRef.current).setView([51.505, -0.09], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);          
              

            fetch('./custom.geo.json')
            .then(res => res.json())
            .then(data => {
                const geoJsonLayer = L.geoJSON(data, {
                    style: defaultStyle,
                    onEachFeature: (feature, layer) => {
                        layerMappingRef.current[feature.properties.iso_a3] = layer;
                      layer.on({
                        mouseover: (e) => {
                          if (e.target !== selectedCountryMapRef.current) {
                            e.target.setStyle(hoverStyle);
                          }
                        },
                        mouseout: (e) => {
                          if (e.target !== selectedCountryMapRef.current) {
                            geoJsonLayer.resetStyle(e.target);
                          }
                        },
                        click: (e) => {
                          if (selectedCountryMapRef.current) {
                            selectedCountryMapRef.current.setStyle(defaultStyle);
                          }                          
                          e.target.setStyle(selectedStyle);
                          setSelectedCountryMap(e.target);
                          selectedCountryMapRef.current = e.target;
                          map.fitBounds(e.target.getBounds());
                        }
                      });
                    }
                }).addTo(map);
            });

            mapInstanceRef.current = map;
        } 

      }, []);
    
      return <div ref={mapRef} className='map-container' style={{ height: '100%', width: '100%' }} />;
}

export default Map
