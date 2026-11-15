import { createClockFeature, createDadJokeFeature, createMoonPhaseFeature, createWeatherFeature } from "./features";
import { startOrientationDebug } from "./orientation/debug";
import { startRouter } from "./router/router";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;
const orientationDebug = document.querySelector<HTMLDivElement>("#orientation-debug")!;

startRouter(app, {
  clock: createClockFeature(),
  dadJoke: createDadJokeFeature(),
  moonPhase: createMoonPhaseFeature(),
  weather: createWeatherFeature(),
});

startOrientationDebug(orientationDebug);
