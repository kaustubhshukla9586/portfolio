import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Self-hosted fonts (no external <link> to Google Fonts).
// Three roles, kept distinct: Barlow Condensed (display), JetBrains Mono
// (labels/meta), Hanken Grotesk (body).
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
