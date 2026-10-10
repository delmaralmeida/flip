/**
 * Uniform interface for all application features.
 * Each feature manages its own lifecycle and side-effects.
 */
export interface IFeature {
  start(element: HTMLElement): void;
  stop(): void;
}
