/*
 * @Date: 2020-06-01 11:15:28
 * @LastEditTime: 2020-06-19 21:12:25
 */

/*
 * action 类型
 */
import { guid } from "../utils";

export const ADD_TODO = Symbol();
export const TOGGLE_TODO = Symbol();
export const SET_VISIBILITY_FILTER = Symbol();

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: Symbol(),
  SHOW_COMPLETED: Symbol(),
  SHOW_ACTIVE: Symbol(),
};

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text, id: guid() };
}

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
