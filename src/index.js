/*
 * @Date: 2020-05-29 11:05:46
 * @LastEditTime: 2020-06-20 17:23:35
 */

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import todoApp from "./reducers";
import App from '@/router';

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
