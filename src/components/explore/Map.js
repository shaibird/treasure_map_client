import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Popup } from 'react-leaflet';
import './Map.css';
import L from 'leaflet';



export const Map = ({ locationDetail, position, setPosition, locations, setShowLocationDetails, setLocationDetail }) => {
  
  const toggleLocationDetail = () => {
    setShowLocationDetails(true);
  }

  const LocationMarker = () => {
    useMapEvents({
      click: (e) => setPosition(e.latlng),
    });

    return position === null ? null : <Marker position={position} />;
  };

  return (
    <MapContainer center={locationDetail.latitude && locationDetail.longitude ? [locationDetail.latitude, locationDetail.longitude] : [35.0458, -85.3094]}
    zoom={14} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
      {locations.map(location => (
        <Marker key={location.id} position={[location.latitude, location.longitude]}>
          <Popup>
            <div>
              <h3>{location.name}</h3>
                <button onClick={() => {
                toggleLocationDetail()
                setLocationDetail(location)}}>Show Details</button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
