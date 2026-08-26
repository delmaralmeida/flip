import { ORIENTATION } from "./orientation/types";
import { getOrientation } from "./orientation/orientation";
import { Clock } from "./features/clock/clock";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;
const clock = new Clock(app);

window.addEventListener("deviceorientation", (event) => {
  if (handleUnsupportedDevice(event)) {
    return;
  }

  const orientation = getOrientation(event.beta!, event.gamma!);

  switch (orientation) {
    case ORIENTATION.VERTICAL_UP:
      renderClock();

      break;
    case ORIENTATION.VERTICAL_DOWN:
      renderDadJoke();

      break;
    case ORIENTATION.HORIZONTAL_LEFT:
      renderTimer();

      break;
    case ORIENTATION.HORIZONTAL_RIGHT:
      renderWeather();

      break;
  }
});

//-- Helper Functions --//

function render(orientation: string) {
  app.textContent = orientation;
}

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
  render("Weather");
}

function renderTimer() {
  app.style.backgroundColor = "blue";
  clock.stop();
  render("Timer");
}

function renderDadJoke() {
  app.style.backgroundColor = "red";
  clock.stop();
  render("Dad Joke");
}
