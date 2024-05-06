import axios from 'axios';
import { configKeys } from '../config/configKeys';

export async function getCoordinates(place: string) {
  const apiKey = configKeys.googleApiKey; 
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    throw new Error('Error fetching coordinates');
  }
}
