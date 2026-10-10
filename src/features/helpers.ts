type TElement = HTMLElement | undefined;

/**
 * Removes the feature styling from the mounted element and clears the reference.
 */
export function clearFeatureClass(element: TElement): TElement {
  if (element) {
    element.className = "";
  }

  return undefined;
}
