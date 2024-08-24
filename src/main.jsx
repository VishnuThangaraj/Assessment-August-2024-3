import React from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);
