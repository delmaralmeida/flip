import { describe, expect, it } from "vitest";
import { getOrientation } from "./orientation";

describe("getOrientation", () => {
  it("detects vertical up", () => {
    expect(getOrientation(90, 0)).toBe("vertical-up");
  });

  it("detects vertical down", () => {
    expect(getOrientation(-90, 0)).toBe("vertical-down");
  });

  it("detects horizontal right", () => {
    expect(getOrientation(0, 90)).toBe("horizontal-right");
  });

  it("detects horizontal left", () => {
    expect(getOrientation(0, -90)).toBe("horizontal-left");
  });
});
