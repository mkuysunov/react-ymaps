import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { YMaps } from "react-yandex-maps";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <YMaps query={{ apikey: "29294198-6cdc-4996-a870-01e89b830f3e", load: "package.full" }}>
      <App />
    </YMaps>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
