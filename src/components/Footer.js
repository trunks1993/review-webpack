/*
 * @Date: 2020-06-19 17:15:21
 * @LastEditTime: 2020-06-19 21:11:15
 */

import React from "react";
import FilterLink from "../containers/FilterLink";
import { VisibilityFilters } from '../actions';

const Footer = () => (
  <p>
    Show: <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    {", "}
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    {", "}
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </p>
);

export default Footer;
