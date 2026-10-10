import { ORIENTATION } from "../orientation/types";
import { getOrientation } from "../orientation/orientation";
import type { IFeature } from "../features/types";
import type { TOrientation } from "../orientation/types";
import type { IFeatureMap } from "./types";

const WARNING_MESSAGE = "Use a mobile device to experience this application.";
/**
 * Listens to deviceorientation events and transitions between features based on device orientation.
 *
 * @param element The root HTMLElement to mount features into.
 * @param features A map of orientation keys to IFeature instances.
 */
export function startRouter(element: HTMLElement, features: IFeatureMap): void {
  let currentOrientation: TOrientation | null = null;
  let currentFeature: IFeature | null = null;

  const orientationMap: Record<TOrientation, IFeature> = {
    [ORIENTATION.VERTICAL_UP]: features.clock,
    [ORIENTATION.VERTICAL_DOWN]: features.dadJoke,
    [ORIENTATION.HORIZONTAL_LEFT]: features.moonPhase,
    [ORIENTATION.HORIZONTAL_RIGHT]: features.weather,
  };

  window.addEventListener("deviceorientation", (event) => {
    if (event.beta === null || event.gamma === null) {
      element.textContent = WARNING_MESSAGE;
      return;
    }

    const orientation = getOrientation(event.beta, event.gamma);
    if (orientation === currentOrientation) {
      return;
    }

    currentFeature?.stop();
    currentOrientation = orientation;
    currentFeature = orientationMap[orientation];
    currentFeature.start(element);
  });
}
