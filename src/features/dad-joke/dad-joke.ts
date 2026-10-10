import { clearFeatureClass } from "../helpers";
import type { IFeature } from "../types";

const DAD_JOKE_API_URL = "https://icanhazdadjoke.com/";

/**
 * Fetches a random dad joke from the API.
 */
export async function fetchDadJoke(): Promise<string> {
  const response = await fetch(DAD_JOKE_API_URL, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dad joke");
  }

  const data: { joke: string } = await response.json();

  return data.joke;
}

/**
 * Creates a dad joke feature that fetches and displays a random dad joke.
 */
export function createDadJokeFeature(): IFeature {
  let mountedElement: HTMLElement | undefined;

  function start(element: HTMLElement): Promise<void> {
    mountedElement = element;
    element.className = "feature-dad-joke";
    element.textContent = "Loading...";

    return fetchDadJoke()
      .then((joke) => {
        element.textContent = joke;
      })
      .catch(() => {
        element.textContent = "Couldn't fetch a joke.";
      });
  }

  function stop(): void {
    mountedElement = clearFeatureClass(mountedElement);
  }

  return { start, stop };
}
