
import './Map.css'
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


function Map({selectedCountryISO, setSelectedCountryISO}) {

    // The map container div
    const mapRef = useRef(null);
    // Map instance
    const mapInstanceRef = useRef(null);
    const layerMappingRef = useRef({});

    const [selectedCountryMap, setSelectedCountryMap] = useState(null);
    const selectedCountryMapRef = useRef(null);

    const defaultStyle = {
        fillColor: "#B6BBC4",
        weight: 2,
        opacity: 1,
        color: "black",
        fillOpacity: 0.7
    };
      
    const hoverStyle = {
        fillColor: "#C5FFF8",
        fillOpacity: 0.7,
        weight: 3,
        color: 'black',
        dashArray: '',
        opacity: 1
    };

    const selectedStyle = {
        fillColor: "#F0ECE5",
        fillOpacity: 0.7,
        weight: 3,
        color: 'black',
        dashArray: '',
        opacity: 0.3
    };  

    useEffect(() => {
        if (!mapInstanceRef.current) {
            return;
          }
        let iso_a3_id = null;
        if (selectedCountryMap) {
            iso_a3_id = selectedCountryMap.feature.properties.iso_a3;
            console.log("here:", iso_a3_id);
            
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
        
        setSelectedCountryMap(newLayer); // 更新 state
        selectedCountryMapRef.current = newLayer; // 更新 ref
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
                          setSelectedCountryMap(e.target); // 更新 state
                          selectedCountryMapRef.current = e.target; // 更新 ref
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
