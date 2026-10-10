# Flip

Flip is a playful mobile web app that uses your phone’s orientation to switch between different tools and widgets.

## Why I made this

I built this app with a few specific objectives in mind:
- **Improve my coding skills** by building a modern web application (Vite + TypeScript).
- **Learn about device orientation**, including how to implement the Web API and how to manually test it using browser sensors.
- **Experiment with free APIs** to populate each orientation feature with interesting data.

## How it works

The app listens to the `deviceorientation` window event to read the `beta` and `gamma` angles of your device. Based on how you hold your phone, it dynamically routes to and mounts a specific feature:

- **Vertical Up:** Clock
- **Vertical Down:** Dad Joke
- **Horizontal Left:** Moon Phase
- **Horizontal Right:** Weather

## Credits & APIs

This app uses several free APIs and libraries to power its features:
- **[Open-Meteo](https://open-meteo.com/)** – For weather forecasts.
- **[countries.dev](https://countries.dev/)** – For fetching city coordinates.
- **[icanhazdadjoke](https://icanhazdadjoke.com/)** – For serving up a random dad joke.
- **[SunCalc](https://github.com/mourner/suncalc)** – For calculating the current moon phase.
