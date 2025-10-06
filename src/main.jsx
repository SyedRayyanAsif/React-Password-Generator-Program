import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // make sure path is correct
import "./index.css"; // your Tailwind CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
