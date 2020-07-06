/*
 * @Date: 2020-07-04 14:00:57
 * @LastEditTime: 2020-07-04 14:38:01
 */

import React from "react";

export default (props) => {
  const { categoryList, productTypeList } = props;
  console.log("categoryList", categoryList);
  return (
    <div className="shop-home_filter-wrapper">
      <ul>
        <li className="shop-home_filter-item--42">
          <span>请选择搜索条件</span>
        </li>
        <li className="shop-home_filter-item--40">
          <span className="shop-home_filter-item-title">选择行业</span>
          <ul className="shop-home_filter-category">
            {_.map(categoryList, (item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </li>
        <li className="shop-home_filter-item--40">选择类型</li>
        <li className="shop-home_filter-item--50">已选条件</li>
      </ul>
    </div>
  );
};
