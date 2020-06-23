/*
 * @Date: 2020-06-19 17:12:40
 * @LastEditTime: 2020-06-19 21:09:04
 */
import { SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions';

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
