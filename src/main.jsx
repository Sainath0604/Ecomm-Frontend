import React from "react";
import { createRoot } from "react-dom/client";
import StateProvider from "./toolkit/StateProvider";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);
