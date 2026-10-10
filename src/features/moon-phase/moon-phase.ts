import * as SunCalc from "suncalc";
import { clearFeatureClass } from "../helpers";
import { MOON_PHASES, MOON_PHASE_THRESHOLDS } from "./constants";
import type { TMoonPhase } from "./types";
import type { IFeature } from "../types";

/**
 * Creates a moon phase feature that displays the current moon phase.
 *
 * @returns An IFeature instance.
 */
export function createMoonPhaseFeature(): IFeature {
  let mountedElement: HTMLElement | undefined;

  function start(element: HTMLElement): void {
    const { phase } = SunCalc.getMoonIllumination(new Date());

    mountedElement = element;
    element.className = "feature-moon-phase";
    element.textContent = getMoonPhaseString(phase);
  }

  function stop(): void {
    mountedElement = clearFeatureClass(mountedElement);
  }

  return { start, stop };
}

/**
 * Calculates the current moon phase.
 *
 * @param phase The numeric phase value from SunCalc (0 to 1)
 */
function getMoonPhaseString(phase: number): TMoonPhase {
  const threshold = MOON_PHASE_THRESHOLDS.find((t) => phase < t.max);

  return threshold ? threshold.label : MOON_PHASES.NEW_MOON.label;
}
