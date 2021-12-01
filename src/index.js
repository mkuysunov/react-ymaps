import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { YMaps } from "react-yandex-maps";

ReactDOM.render(
  <React.StrictMode>
    <YMaps query={{ apikey: "29294198-6cdc-4996-a870-01e89b830f3e" }}>
      <App />
    </YMaps>
  </React.StrictMode>,
  document.getElementById("root")
);
