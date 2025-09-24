import axios from 'axios';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather forecast');
  }
};

export const getRainfall = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    // Filter for rain data
    const rainData = response.data.list.map(item => ({
      time: item.dt_txt,
      rain: item.rain?.['3h'] || 0
    }));
    return rainData;
  } catch (error) {
    throw new Error('Failed to fetch rainfall data');
  }
};
