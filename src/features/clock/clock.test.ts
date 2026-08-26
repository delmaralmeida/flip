import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { Clock } from "./clock";

describe("Clock", () => {
  let element: HTMLDivElement;
  let clock: Clock;

  beforeEach(() => {
    element = document.createElement("div");
    clock = new Clock(element);

    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 23, 16, 50, 30));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays the current time when started", () => {
    clock.start();
    expect(element.textContent).toBe("16:50");
  });

  it("updates when the minute changes", () => {
    clock.start();
    expect(element.textContent).toBe("16:50");

    vi.advanceTimersByTime(30_000);
    expect(element.textContent).toBe("16:51");
  });

  it("stops updating when stopped", () => {
    clock.start();
    clock.stop();

    vi.setSystemTime(new Date(2026, 7, 23, 16, 51, 30));
    vi.advanceTimersByTime(60_000);
    expect(element.textContent).toBe("16:50");
  });
});
