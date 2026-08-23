export const ORIENTATION = {
  VERTICAL_UP: "vertical-up",
  VERTICAL_DOWN: "vertical-down",
  HORIZONTAL_LEFT: "horizontal-left",
  HORIZONTAL_RIGHT: "horizontal-right",
} as const;

export type TOrientation = typeof ORIENTATION[keyof typeof ORIENTATION];
