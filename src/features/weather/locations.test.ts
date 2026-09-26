import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { getCities } from './locations';
import type { ICity } from './types';

const tokyo: ICity = { name: 'Tokyo', latitude: 35.6895, longitude: 139.6917 };
const london: ICity = { name: 'London', latitude: 51.5074, longitude: -0.1278 };

describe('getCities', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches data from countries.dev and persists to localStorage', async () => {
    const mockData = [
      { ...tokyo, extra: 'ignore' },
      london,
    ];
    const fetchMock = vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData
    } as Response);
    const cities = await getCities();

    expect(fetchMock).toHaveBeenCalledWith('https://countries.dev/cities');
    expect(cities).toEqual([tokyo, london]);

    const cached = JSON.parse(localStorage.getItem('weather_cities_cache') || '[]');
    expect(cached).toEqual(cities);
  });

  it('skips the API call when localStorage has cached data', async () => {
    const cachedCities = [tokyo];
    localStorage.setItem('weather_cities_cache', JSON.stringify(cachedCities));

    const fetchMock = vi.mocked(fetch);
    const cities = await getCities();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(cities).toEqual(cachedCities);
  });

  it('throws an error if the fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    } as Response);

    await expect(getCities()).rejects.toThrow('Failed to fetch cities: 500 Internal Server Error');
  });
});
