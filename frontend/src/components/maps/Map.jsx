import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MAP_CONFIG } from '../../utils/constants';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);

  return null;
};

const Map = ({
  center = MAP_CONFIG.defaultCenter,
  zoom = MAP_CONFIG.defaultZoom,
  markers = [],
  onMapClick,
  className = '',
  style = { height: '400px' }
}) => {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`} style={style}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={MAP_CONFIG.tileLayer}
        />
        
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={marker.icon || DefaultIcon}
          >
            {marker.popup && (
              <Popup>
                {marker.popup}
              </Popup>
            )}
          </Marker>
        ))}

        <RecenterAutomatically lat={center[0]} lng={center[1]} />
        
        {onMapClick && (
          <MapClickHandler onMapClick={onMapClick} />
        )}
      </MapContainer>
    </div>
  );
};

const MapClickHandler = ({ onMapClick }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !onMapClick) return;

    const handleClick = (e) => {
      onMapClick({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map, onMapClick]);

  return null;
};

export default Map;
