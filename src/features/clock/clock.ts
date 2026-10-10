import { clearFeatureClass } from "../helpers";
import type { IFeature } from "../types";

/**
 * Formats a date into a "HH:MM" string.
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Creates a clock feature that displays the current time in HH:MM format.
 */
export function createClockFeature(): IFeature {
  let timeoutId: number | undefined;
  let mountedElement: HTMLElement | undefined;

  function start(element: HTMLElement): void {
    stop();

    mountedElement = element;
    element.className = "feature-clock";

    update();
  }

  function stop(): void {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    mountedElement = clearFeatureClass(mountedElement);
  }

  function update(): void {
    if (!mountedElement) return;
    mountedElement.textContent = formatTime(new Date());

    const now = new Date();
    const millisecondsUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    timeoutId = window.setTimeout(update, millisecondsUntilNextMinute);
  }

  return { start, stop };
}
