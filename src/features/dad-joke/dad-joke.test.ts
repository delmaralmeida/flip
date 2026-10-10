import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { fetchDadJoke, createDadJokeFeature } from "./dad-joke";
import type { IFeature } from "../types";

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

describe("createDadJokeFeature", () => {
  let element: HTMLDivElement;
  let feature: IFeature;

  beforeEach(() => {
    element = document.createElement("div");
    feature = createDadJokeFeature();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays the joke after start", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ joke: mockJoke }), {
        status: 200,
      }),
    );

    const promise = feature.start(element);
    expect(element.textContent).toBe("Loading...");
    await promise;
    expect(element.textContent).toBe(mockJoke);
  });

  it("handles the feature-dad-joke class on start and stop", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ joke: mockJoke }), { status: 200 }),
    );

    await feature.start(element);
    expect(element.className).toBe("feature-dad-joke");

    feature.stop();
    expect(element.className).toBe("");
  });

  it("shows an error when fetching fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new Error("Network error"),
    );

    await feature.start(element);
    expect(element.textContent).toBe("Couldn't fetch a joke.");
  });
});
