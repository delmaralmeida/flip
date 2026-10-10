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

export const TEST_CASES = [
  { phase: 0, expected: MOON_PHASES.NEW_MOON.label },
  { phase: 0.125, expected: MOON_PHASES.WAXING_CRESCENT.label },
  { phase: 0.25, expected: MOON_PHASES.FIRST_QUARTER.label },
  { phase: 0.375, expected: MOON_PHASES.WAXING_GIBBOUS.label },
  { phase: 0.5, expected: MOON_PHASES.FULL_MOON.label },
  { phase: 0.625, expected: MOON_PHASES.WANING_GIBBOUS.label },
  { phase: 0.75, expected: MOON_PHASES.LAST_QUARTER.label },
  { phase: 0.875, expected: MOON_PHASES.WANING_CRESCENT.label },
];

export const MOON_PHASE_THRESHOLDS = Object.values(MOON_PHASES);
