import * as SunCalc from "suncalc";
import { MOON_PHASES, MOON_PHASE_THRESHOLDS } from "./types";
import type { TMoonPhase } from "./types";

/**
 * Displays the current moon phase.
 *
 * @param element The HTML element where the moon phase will be displayed.
 */
export function showMoonPhase(element: HTMLElement): void {
  const { phase } = SunCalc.getMoonIllumination(new Date());

  element.textContent = getMoonPhaseString(phase);
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
