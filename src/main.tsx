import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@pigment-css/react/styles.css";
import "./main.css";
import { globalCss } from "@pigment-css/react";

globalCss`
body {
  background-color: #1E1E1E;
 background-image: linear-gradient(rgba(38, 71, 111, 1), rgba(38, 71, 111, 0.1));
 color: #F1F1F1;
}`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
