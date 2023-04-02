/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "react-tooltip/dist/react-tooltip.css";
import App from "App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
