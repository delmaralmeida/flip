import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { showWeather, fetchWeather } from './weather';
import type { ICity, IWeather } from './types';

describe('fetchWeather', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches weather and returns temperature and weathercode', async () => {
    const fetchMock = vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        current_weather: {
          temperature: 18.5,
          weathercode: 3
        } satisfies IWeather
      })
    } as Response);

    const result = await fetchWeather(52.52, 13.41);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true'
    );
    expect(result).toEqual({ temperature: 18.5, weathercode: 3 });
  });

  it('throws an error if the fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    } as Response);

    await expect(fetchWeather(52.52, 13.41)).rejects.toThrow('Failed to fetch weather: 404 Not Found');
  });
});

describe('showWeather', () => {
  let element: HTMLElement;

  const tokyo: ICity = { name: 'Tokyo', latitude: 35.6895, longitude: 139.6917 };
  const paris: ICity = { name: 'Paris', latitude: 48.8566, longitude: 2.3522 };
  const london: ICity = { name: 'London', latitude: 51.5074, longitude: -0.1278 };

  function cacheCities(cities: ICity[]): void {
    localStorage.setItem('weather_cities_cache', JSON.stringify(cities));
  }
  function getCityApiCalls() {
    return vi.mocked(fetch).mock.calls.filter(([url]) => url === 'https://countries.dev/cities');
  }

  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn());
    element = document.createElement('div');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state and displays weather description', async () => {
    let resolveCities!: (value: Response) => void;
    let resolveWeather!: (value: Response) => void;

    const fetchMock = vi.mocked(fetch);
    fetchMock.mockReturnValueOnce(new Promise(resolve => resolveCities = resolve));
    fetchMock.mockReturnValueOnce(new Promise(resolve => resolveWeather = resolve));

    const promise = showWeather(element);
    resolveCities(new Response(JSON.stringify([london]), { status: 200 }));
    await new Promise(resolve => setTimeout(resolve, 0));

    // Loading state
    expect(element.textContent).toBe('Fetching weather from London...');
    // Call getCities() once
    expect(getCityApiCalls()).toHaveLength(1);

    resolveWeather(new Response(JSON.stringify({
      current_weather: { temperature: 14.5, weathercode: 61 }
    }), { status: 200 }));

    await promise;

    // Weather description
    expect(element.textContent).toBe('Light rain in London (14.5°C)');
  });

  it('skips "countrie.dev" API call when the cache is populated', async () => {
    cacheCities([tokyo]);

    let resolveWeather!: (value: Response) => void;
    vi.mocked(fetch).mockReturnValueOnce(new Promise(resolve => resolveWeather = resolve));

    showWeather(element);
    await new Promise(resolve => setTimeout(resolve, 0));
    // skips getCities() call
    expect(getCityApiCalls()).toHaveLength(0);

    resolveWeather(new Response(JSON.stringify({
      current_weather: { temperature: 20, weathercode: 0 }
    }), { status: 200 }));
  });

  it('falls back to generic description for unknown WMO codes', async () => {
    cacheCities([tokyo]);

    vi.mocked(fetch).mockResolvedValueOnce(new Response(JSON.stringify({
      current_weather: { temperature: 10, weathercode: 999 }
    }), { status: 200 }));

    await showWeather(element);

    expect(element.textContent).toBe('Unknown conditions in Tokyo (10°C)');
  });

  it('shows error state if city fetch fails', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    // When city fetch fails
    await showWeather(element);
    expect(element.textContent).toBe("Couldn't fetch weather.");

    // When weather fetch fails
    cacheCities([paris]);
    await showWeather(element);
    expect(element.textContent).toBe("Couldn't fetch weather for Paris.");
  });
});

