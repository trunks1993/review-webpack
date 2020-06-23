/*
 * @Date: 2020-06-16 15:34:56
 * @LastEditTime: 2020-06-19 21:09:30
 */

import { ADD_TODO, TOGGLE_TODO } from '../actions';

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo) => todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default todos;
