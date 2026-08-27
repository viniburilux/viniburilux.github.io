import React from "react";
import { createRoot } from "react-dom/client";
import LyrioESGPlatform from "../src/LyrioESGPlatform.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LyrioESGPlatform />
  </React.StrictMode>,
);
