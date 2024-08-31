import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MainContext from "./components/MainContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
      <BrowserRouter>
        <MainContext>
          <App />
        </MainContext>
      </BrowserRouter>
  </StrictMode>
);
