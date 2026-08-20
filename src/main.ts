import { getOrientation } from "./orientation/orientation";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

function render(orientation: string) {
  app.textContent = orientation;
}

window.addEventListener("deviceorientation", (event) => {
  if (event.beta === null || event.gamma === null) {
    render("No orientation detected...");

    return;
  }

  const orientation = getOrientation(event.beta, event.gamma);

  render(orientation);
  console.log(`Orientation: ${orientation}, Beta: ${event.beta}, Gamma: ${event.gamma}`)
});

console.log("Listening for device orientation events...");
