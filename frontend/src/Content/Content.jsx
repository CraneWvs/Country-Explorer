// 在 Content/Content.jsx 文件中

// import React from 'react';
import React, { useState, useEffect } from 'react';
import './Content.css'; // 确保你有一个对应的CSS文件
import Info from './Info/Info'; // 假设你有一个Info子组件
import Map from './Map/Map'; // 假设你有一个Map子组件

const Content = () => {
    const [selectedCountryISO, setSelectedCountryISO] = useState(null);

    return (
        <div className="content">
        <div className="info-area">
            <Info  selectedCountryISO={selectedCountryISO} setSelectedCountryISO={setSelectedCountryISO}/> {/* 这里将是显示国家信息的组件 */}
        </div>
        <div className="map-area" >
            <Map selectedCountryISO={selectedCountryISO} setSelectedCountryISO={setSelectedCountryISO}/> {/* 这里将是显示地图的组件 */}
        </div>
        </div>
    );
};

export default Content;

