import { ORIENTATION } from "./orientation/types";
import { getOrientation } from "./orientation/orientation";
import { createClock, showDadJoke, showMoonPhase, showWeather } from "./features";
import type { TOrientation } from "./orientation/types";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;
const clock = createClock(app);

let currentOrientation: TOrientation | null = null;

//-- Main Feature --//
window.addEventListener("deviceorientation", (event) => {
  if (handleUnsupportedDevice(event)) {
    return;
  }

  const orientation = getOrientation(event.beta!, event.gamma!);
  if (orientation === currentOrientation) {
    return;
  }

  currentOrientation = orientation;

  switch (orientation) {
    case ORIENTATION.VERTICAL_UP:
      renderClock();

      break;
    case ORIENTATION.VERTICAL_DOWN:
      renderDadJoke();

      break;
    case ORIENTATION.HORIZONTAL_LEFT:
      renderMoonPhase();

      break;
    case ORIENTATION.HORIZONTAL_RIGHT:
      renderWeather();

      break;
  }
});

//-- Helper Functions --//

function handleUnsupportedDevice(event: DeviceOrientationEvent): boolean {
  if (event.beta === null || event.gamma === null) {
    app.textContent = "Use a mobile device to experience this application.";

    return true;
  }

  return false;
}

function renderClock() {
  app.style.backgroundColor = "green";
  clock.start();
}

function renderWeather() {
  app.style.backgroundColor = "yellow";
  clock.stop();
  showWeather(app);
}

function renderMoonPhase() {
  app.style.backgroundColor = "blue";
  clock.stop();
  showMoonPhase(app);
}

function renderDadJoke() {
  app.style.backgroundColor = "red";
  clock.stop();
  showDadJoke(app);
}
