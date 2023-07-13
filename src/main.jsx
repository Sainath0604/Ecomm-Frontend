import React from "react";
import { createRoot } from "react-dom/client";
import StateProvider from "./toolkit/StateProvider";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <App />
      <Analytics />
    </StateProvider>
  </React.StrictMode>
);
