/*
 * @Date: 2020-06-19 17:14:29
 * @LastEditTime: 2020-06-19 20:17:22
 */

import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

const TodoList = ({ todos = [], onTodoClick }) => (
  <ul>
    {todos.map((todo) => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

// TodoList.propTypes = {
//   todos: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       completed: PropTypes.bool.isRequired,
//       text: PropTypes.string.isRequired,
//     }).isRequired
//   ).isRequired,
//   onTodoClick: PropTypes.func.isRequired,
// };

export default TodoList;
