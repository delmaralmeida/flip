import type { TOrientation } from "./types";
import { ORIENTATION } from "./types";

export function getOrientation(beta: number, gamma: number): TOrientation {
  if (Math.abs(gamma) > 45) {
    return gamma > 0 ? ORIENTATION.HORIZONTAL_RIGHT : ORIENTATION.HORIZONTAL_LEFT;
  }

  return beta > 0 ? ORIENTATION.VERTICAL_UP : ORIENTATION.VERTICAL_DOWN;
}
