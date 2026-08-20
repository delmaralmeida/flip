export type Orientation =
  | "vertical-up"
  | "vertical-down"
  | "horizontal-left"
  | "horizontal-right";

export function getOrientation(beta: number, gamma: number): Orientation {
  if (Math.abs(gamma) > 45) {
    return gamma > 0 ? "horizontal-right" : "horizontal-left";
  }

  return beta > 0 ? "vertical-up" : "vertical-down";
}
