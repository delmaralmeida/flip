import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createMoonPhaseFeature } from "./moon-phase";
import { TEST_CASES } from "./constants";
import type { IFeature } from "../types";
import * as SunCalc from "suncalc";

vi.mock("suncalc", () => ({
  getMoonIllumination: vi.fn(),
}));

describe("createMoonPhaseFeature", () => {
  let element: HTMLElement;
  let feature: IFeature;

  beforeEach(() => {
    element = document.createElement("div");
    feature = createMoonPhaseFeature();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays the correct moon phase string based on the SunCalc phase", () => {
    for (const { phase, expected } of TEST_CASES) {
      vi.mocked(SunCalc.getMoonIllumination).mockReturnValue({
        phase,
        fraction: 1,
        angle: 0,
        waxing: false
      });
      feature.start(element);
      expect(element.textContent).toBe(expected);
    }
  });

  it("stop is a no-op (stateless feature)", () => {
    expect(() => feature.stop()).not.toThrow();
  });
});
