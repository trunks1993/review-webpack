/*
 * @Date: 2020-06-19 17:13:14
 * @LastEditTime: 2020-06-19 20:28:26
 */

import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

export default todoApp;
