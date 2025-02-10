import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "components/app";
import { BrowserRouter } from "react-router-dom";
import { createRandomizer } from "./services/questions/index.mjs";
import { withAppContext } from "./context/app.jsx";

const randomizer = createRandomizer();
const AppComponent = withAppContext(App , { randomizer: randomizer.useRandomiseFrom })
hydrateRoot(
  document.getElementById("app"),
  <BrowserRouter>
    <AppComponent />
  </BrowserRouter>
);
