import type { ICity } from './types';

const CITIES_CACHE_KEY = 'weather_cities_cache';
const CITIES_API_URL = 'https://countries.dev/cities';

/**
 * Fetches a list of cities from the countries.dev API and caches them in localStorage.
 * Subsequent calls will return the cached cities without making a network request.
 *
 * @returns An array of cached or newly fetched city objects.
 */
export async function getCities(): Promise<ICity[]> {
  const cached = localStorage.getItem(CITIES_CACHE_KEY);
  if (cached) return JSON.parse(cached);

  const response = await fetch(CITIES_API_URL);
  if (!response.ok) throw new Error(`Failed to fetch cities: ${response.status} ${response.statusText}`);

  const data = await response.json();
  const cities: ICity[] = data.map((c: any) => ({
    name: c.name,
    latitude: c.latitude,
    longitude: c.longitude
  }));

  localStorage.setItem(CITIES_CACHE_KEY, JSON.stringify(cities));
  return cities;
}
