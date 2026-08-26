/**
 * Clock class
 * It displays the current time in HH:MM format and updates every minute.
 */
export class Clock {
  private _timeoutId?: number;
  private readonly _element: HTMLElement;

  constructor(element: HTMLElement) {
    this._element = element;  
  }

  start(): void {
    this._update();
  }

  stop(): void {
    if (this._timeoutId !== undefined) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    }
  }

  private _update(): void {
    this._element.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const now = new Date();
    const millisecondsUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    this._timeoutId = window.setTimeout(
      () => this._update(),
      millisecondsUntilNextMinute,
    );
  }
}
