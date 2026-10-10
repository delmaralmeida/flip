import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { IFeature } from "../features/types";
import type { IFeatureMap } from "./types";

function makeFeatureMock(): IFeature {
  return {
    start: vi.fn(),
    stop: vi.fn(),
  };
}

function dispatchOrientation(beta: number, gamma: number): void {
  window.dispatchEvent(
    new DeviceOrientationEvent("deviceorientation", { beta, gamma }),
  );
}

describe("orientation router", () => {
  const app = document.createElement("div");

  let clock: IFeature;
  let dadJoke: IFeature;
  let moonPhase: IFeature;
  let weather: IFeature;
  let startRouter: (
    element: HTMLElement,
    features: IFeatureMap,
  ) => void;

  beforeEach(async () => {
    clock = makeFeatureMock();
    dadJoke = makeFeatureMock();
    moonPhase = makeFeatureMock();
    weather = makeFeatureMock();

    const mod = await import("./router");
    startRouter = mod.startRouter;
  });

  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("calls start on the clock feature when oriented vertically up", () => {
    startRouter(app, { clock, dadJoke, moonPhase, weather });

    dispatchOrientation(45, 0);

    expect(clock.start).toHaveBeenCalledWith(app);
    expect(clock.stop).not.toHaveBeenCalled();
  });

  it("calls start on the dadJoke feature when oriented vertically down", () => {
    startRouter(app, { clock, dadJoke, moonPhase, weather });

    dispatchOrientation(-45, 0);

    expect(dadJoke.start).toHaveBeenCalledWith(app);
  });

  it("calls start on the moonPhase feature when oriented horizontally left", () => {
    startRouter(app, { clock, dadJoke, moonPhase, weather });

    dispatchOrientation(0, -90);

    expect(moonPhase.start).toHaveBeenCalledWith(app);
  });

  it("calls start on the weather feature when oriented horizontally right", () => {
    startRouter(app, { clock, dadJoke, moonPhase, weather });

    dispatchOrientation(0, 90);

    expect(weather.start).toHaveBeenCalledWith(app);
  });

  it("calls stop on the outgoing feature when orientation changes", () => {
    startRouter(app, { clock, dadJoke, moonPhase, weather });

    // clock
    dispatchOrientation(45, 0);
    // dadJoke
    dispatchOrientation(-45, 0);

    expect(clock.stop).toHaveBeenCalledOnce();
    expect(dadJoke.start).toHaveBeenCalledWith(app);
  });

  it("does not call start again if orientation has not changed", () => {
    startRouter(app, { clock, dadJoke, moonPhase, weather });

    dispatchOrientation(45, 0);
    dispatchOrientation(45, 0);

    expect(clock.start).toHaveBeenCalledOnce();
  });

  it("shows warning message when beta or gamma is null", () => {
    startRouter(app, { clock, dadJoke, moonPhase, weather });

    window.dispatchEvent(
      new DeviceOrientationEvent("deviceorientation", { beta: null, gamma: null }),
    );

    expect(app.textContent).toBe("Use a mobile device to experience this application.");
    expect(clock.start).not.toHaveBeenCalled();
  });
});
