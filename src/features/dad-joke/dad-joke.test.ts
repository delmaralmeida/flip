import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { fetchDadJoke, showDadJoke } from "./dad-joke";

const mockJoke = "A funny joke.";

describe("fetchDadJoke", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the fetched joke", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          joke: mockJoke,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    const joke = await fetchDadJoke();
    expect(joke).toBe(mockJoke);
  });

  it("throws when the request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new Error("Network error"),
    );

    await expect(fetchDadJoke()).rejects.toThrow("Network error");
  });
});

describe("showDadJoke", () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement("div");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays the joke", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ joke: mockJoke }), {
        status: 200,
      }),
    );

    await showDadJoke(element);
    expect(element.textContent).toBe(mockJoke);
  });

  it("shows loading while fetching", async () => {
    let resolveFetch!: (response: Response) => void;

    vi.spyOn(globalThis, "fetch").mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const promise = showDadJoke(element);

    expect(element.textContent).toBe("Loading...");

    resolveFetch(
      new Response(JSON.stringify({ joke: "A joke." }), {
        status: 200,
      }),
    );

    await promise;
  });

  it("shows an error when fetching fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new Error("Network error"),
    );

    await showDadJoke(element);
    expect(element.textContent).toBe("Couldn't fetch a joke.");
  });
});
