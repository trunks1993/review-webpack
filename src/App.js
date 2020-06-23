/*
 * @Date: 2020-06-19 17:15:37
 * @LastEditTime: 2020-06-19 21:19:41
 */

import React from 'react';
import Footer from './components/Footer';
import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
