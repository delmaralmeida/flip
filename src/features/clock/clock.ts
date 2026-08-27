/**
 * Creates a clock that displays the current time in HH:MM format.
 *
 * @param element The HTML element where the clock will be displayed.
 * @returns An object with start and stop methods to control the clock.
 */
export function createClock(element: HTMLElement) {
  let timeoutId: number | undefined;

  function start(): void {
    stop();
    update();
  }

  function stop(): void {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  }

  function update(): void {
    element.textContent = formatTime(new Date());

    const now = new Date();
    const millisecondsUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    timeoutId = window.setTimeout(update, millisecondsUntilNextMinute);
  }

  return {
    start,
    stop,
  };
}

/**
 * Formats a date object into a time string in HH:MM format.
 *
 * @param date The date object to format.
 * @returns A formatted time string.
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
