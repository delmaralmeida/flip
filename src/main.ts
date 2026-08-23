import { ORIENTATION } from "./orientation/types";
import { getOrientation } from "./orientation/orientation";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

function render(orientation: string) {
  app.textContent = orientation;
}

window.addEventListener("deviceorientation", (event) => {
  if (event.beta === null || event.gamma === null) {
    render("Use a mobile device to experience this application.");

    return;
  }

  const orientation = getOrientation(event.beta, event.gamma);

  switch (orientation) {
    case ORIENTATION.VERTICAL_UP:
      app.style.backgroundColor = "green";
      render(orientation); // render Clock

      break;
    case ORIENTATION.VERTICAL_DOWN:
      app.style.backgroundColor = "red";
      render(orientation); // render Dad Joke

      break;
    case ORIENTATION.HORIZONTAL_LEFT:
      app.style.backgroundColor = "blue";
      render(orientation); // render Timer

      break;
    case ORIENTATION.HORIZONTAL_RIGHT:
      app.style.backgroundColor = "yellow";
      render(orientation); // render Weather

      break;
  }
});
