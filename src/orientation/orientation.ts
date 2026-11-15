import type { TOrientation } from "./types";
import { ORIENTATION } from "./types";

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

/**
 * Derives orientation from how much gravity pulls along each device edge.
 * Avoids the gamma sign flip that happens near ±90° when the device is sideways.
 */
export function getOrientation(beta: number, gamma: number): TOrientation {
  const b = toRadians(beta);
  const g = toRadians(gamma);
  const verticalTilt = Math.sin(b);
  const sideTilt = Math.sin(g) * Math.cos(b);

  if (Math.abs(sideTilt) > Math.abs(verticalTilt)) {
    return sideTilt > 0 ? ORIENTATION.HORIZONTAL_RIGHT : ORIENTATION.HORIZONTAL_LEFT;
  }

  return verticalTilt > 0 ? ORIENTATION.VERTICAL_UP : ORIENTATION.VERTICAL_DOWN;
}
