import { describe, expect, it } from "vitest";
import { getOrientation } from "./orientation";
import { ORIENTATION } from "./types";

describe("getOrientation", () => {
  it("detects vertical up", () => {
    expect(getOrientation(90, 0)).toBe(ORIENTATION.VERTICAL_UP);
  });

  it("detects vertical down", () => {
    expect(getOrientation(-90, 0)).toBe(ORIENTATION.VERTICAL_DOWN);
  });

  it("detects horizontal right", () => {
    expect(getOrientation(0, 90)).toBe(ORIENTATION.HORIZONTAL_RIGHT);
  });

  it("detects horizontal left", () => {
    expect(getOrientation(0, -90)).toBe(ORIENTATION.HORIZONTAL_LEFT);
  });

  it("keeps horizontal right when the screen leans toward the floor", () => {
    expect(getOrientation(0, 85)).toBe(ORIENTATION.HORIZONTAL_RIGHT);
    expect(getOrientation(180, -85)).toBe(ORIENTATION.HORIZONTAL_RIGHT);
  });

  it("keeps horizontal left when the screen leans toward the floor", () => {
    expect(getOrientation(0, -85)).toBe(ORIENTATION.HORIZONTAL_LEFT);
    expect(getOrientation(-180, 85)).toBe(ORIENTATION.HORIZONTAL_LEFT);
  });
});
