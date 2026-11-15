const format = (value: number | null): string => value?.toFixed(1) ?? "n/a";

/**
 * Displays live deviceorientation alpha, beta and gamma values for manual testing.
 *
 * @param element The HTMLElement to render the values into.
 */
export function startOrientationDebug(element: HTMLElement): void {
  window.addEventListener("deviceorientation", ({ alpha, beta, gamma }) => {
    element.textContent = `α ${format(alpha)} · β ${format(beta)} · γ ${format(gamma)}`;
  });
}
