export const MOON_PHASES = {
  NEW_MOON:        { label: "New Moon", max: 0.02 },
  WAXING_CRESCENT: { label: "Waxing Crescent", max: 0.23 },
  FIRST_QUARTER:   { label: "First Quarter", max: 0.27 },
  WAXING_GIBBOUS:  { label: "Waxing Gibbous", max: 0.48 },
  FULL_MOON:       { label: "Full Moon", max: 0.52 },
  WANING_GIBBOUS:  { label: "Waning Gibbous", max: 0.73 },
  LAST_QUARTER:    { label: "Last Quarter", max: 0.77 },
  WANING_CRESCENT: { label: "Waning Crescent", max: 0.98 },
} as const;
export const MOON_PHASE_THRESHOLDS = Object.values(MOON_PHASES);
export type TMoonPhase = typeof MOON_PHASES[keyof typeof MOON_PHASES]["label"];
