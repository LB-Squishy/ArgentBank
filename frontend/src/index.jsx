import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Router from "./Router.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);
