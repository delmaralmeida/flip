import { MOON_PHASES } from './constants';

export type TMoonPhase = typeof MOON_PHASES[keyof typeof MOON_PHASES]["label"];
