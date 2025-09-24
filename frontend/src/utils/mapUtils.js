import { MAP_CONFIG } from './constants';

export const createMapInstance = (container) => {
  if (!container) return null;
  
  return {
    center: MAP_CONFIG.defaultCenter,
    zoom: MAP_CONFIG.defaultZoom,
    scrollWheelZoom: true
  };
};

export const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error('Error getting address:', error);
    return 'Address not found';
  }
};

export const validateCoordinates = (lat, lng) => {
  const isValidLat = lat >= -90 && lat <= 90;
  const isValidLng = lng >= -180 && lng <= 180;
  return isValidLat && isValidLng;
};
