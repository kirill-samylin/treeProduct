import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components";
import { store } from "./store/store";
import { Provider } from "react-redux";


const root = document.getElementById("root");
const cdnHost = root.getAttribute("data-cdn-host");
const language = root.getAttribute("data-language");
const params = {
  cdnHost,
  language,
};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App {...params} />
    </Provider>
  </React.StrictMode>,
  root
);
