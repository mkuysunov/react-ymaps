import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { YMaps } from "react-yandex-maps";
import { createTheme, ThemeProvider } from "@mui/material";

function MuiCustomization({ children }) {
  const theme = {
    components: {
      MuiButton: {
        defaultProps: { variant: "contained", disableElevation: true },
      },
    },
  };

  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
}

ReactDOM.render(
  <React.StrictMode>
    <MuiCustomization>
      <YMaps query={{ apikey: "29294198-6cdc-4996-a870-01e89b830f3e", lang: "en_RU" }}>
        <App />
      </YMaps>
    </MuiCustomization>
  </React.StrictMode>,
  document.getElementById("root")
);
