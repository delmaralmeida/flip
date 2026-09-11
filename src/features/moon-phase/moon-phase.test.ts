import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { showMoonPhase } from "./moon-phase";
import { MOON_PHASES } from "./types";
import * as SunCalc from "suncalc";

vi.mock("suncalc", () => ({
  getMoonIllumination: vi.fn(),
}));

describe("showMoonPhase", () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("div");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays the correct moon phase string based on the SunCalc phase", () => {
    const testCases = [
      { phase: 0, expected: MOON_PHASES.NEW_MOON.label },
      { phase: 0.125, expected: MOON_PHASES.WAXING_CRESCENT.label },
      { phase: 0.25, expected: MOON_PHASES.FIRST_QUARTER.label },
      { phase: 0.375, expected: MOON_PHASES.WAXING_GIBBOUS.label },
      { phase: 0.5, expected: MOON_PHASES.FULL_MOON.label },
      { phase: 0.625, expected: MOON_PHASES.WANING_GIBBOUS.label },
      { phase: 0.75, expected: MOON_PHASES.LAST_QUARTER.label },
      { phase: 0.875, expected: MOON_PHASES.WANING_CRESCENT.label },
    ];

    for (const { phase, expected } of testCases) {
      vi.mocked(SunCalc.getMoonIllumination).mockReturnValue({
        phase,
        fraction: 1,
        angle: 0,
        waxing: false
      });
      showMoonPhase(element);
      expect(element.textContent).toBe(expected);
    }
  });
});
