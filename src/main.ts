import { createClockFeature, createDadJokeFeature, createMoonPhaseFeature, createWeatherFeature } from "./features";
import { startRouter } from "./router/router";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

startRouter(app, {
  clock: createClockFeature(),
  dadJoke: createDadJokeFeature(),
  moonPhase: createMoonPhaseFeature(),
  weather: createWeatherFeature(),
});
