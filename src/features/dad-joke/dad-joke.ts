const DAD_JOKE_API_URL = "https://icanhazdadjoke.com/";

/**
 * Displays a random dad joke in the specified HTML element.
 *
 * @param element The HTML element where the joke will be displayed.
 */
export async function showDadJoke(element: HTMLElement): Promise<void> {
  element.textContent = "Loading...";

  try {
    const joke = await fetchDadJoke();
    element.textContent = joke;
  } catch {
    element.textContent = "Couldn't fetch a joke.";
  }
}

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
