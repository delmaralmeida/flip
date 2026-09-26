import { getCities } from './locations';
import wmoCodes from './wmo-codes.json';
import type { IWeather } from './types';

const OPEN_METEO_API_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetches the current weather for a specific latitude and longitude from the open-meteo API.
 * 
 * @param lat The location's latitude.
 * @param lon The location's longitude.
 * @returns An object containing the temperature and weathercode.
 */
export async function fetchWeather(lat: number, lon: number): Promise<IWeather> {
  const searchParams = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current_weather: 'true',
  });

  const response = await fetch(`${OPEN_METEO_API_URL}?${searchParams}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return {
    temperature: data.current_weather.temperature,
    weathercode: data.current_weather.weathercode,
  };
}

/**
 * Displays the weather for a random cached city in the specified HTML element.
 *
 * @param element The HTML element where the weather will be displayed.
 */
export async function showWeather(element: HTMLElement): Promise<void> {
  let cityName = '';

  try {
    const cities = await getCities();
    if (cities.length === 0) {
      throw new Error('No cities available');
    }

    const city = cities[Math.floor(Math.random() * cities.length)];
    cityName = city.name;
    element.textContent = `Fetching weather from ${cityName}...`;

    const weather = await fetchWeather(city.latitude, city.longitude);
    const description = (wmoCodes as Record<string, string>)[weather.weathercode.toString()] || 'Unknown conditions';

    element.textContent = `${description} in ${cityName} (${weather.temperature}°C)`;
  } catch (error) {
    if (cityName) {
      element.textContent = `Couldn't fetch weather for ${cityName}.`;
    } else {
      element.textContent = `Couldn't fetch weather.`;
    }
  }
}
