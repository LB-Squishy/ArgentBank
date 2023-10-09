import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Router from "./Router.jsx";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </React.StrictMode>
);
