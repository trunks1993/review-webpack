/*
 * @Date: 2020-05-29 11:05:46
 * @LastEditTime: 2020-06-19 20:36:48
 */

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import todoApp from "./reducers";
import App from "./App";

const reduxDevtools = window.devToolsExtension
  ? window.devToolsExtension()
  : () => {};

let store = createStore(todoApp, reduxDevtools);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
