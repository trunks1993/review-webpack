/*
 * @Date: 2020-07-04 14:00:57
 * @LastEditTime: 2020-07-13 11:14:04
 */

import React, { useState, useEffect } from "react";

export default (props) => {
  const { categoryList, productTypeList, onFilterChange } = props;
  const [categorySelect, setCategorySelect] = useState("");
  const [productTypeSelect, setProductTypeSelect] = useState("");

  useEffect(() => {
    if (categoryList.length) {
      setCategorySelect(categoryList[0].id);
      onFilterChange(categoryList[0].id, productTypeSelect);
    }
  }, [categoryList]);

  useEffect(() => {
    if (productTypeList.length) {
      setProductTypeSelect(productTypeList[0].id);
      onFilterChange(categorySelect, productTypeList[0].id);
    }
  }, [productTypeList]);

  // useImperativeHandle(forwardedRef, () => ({
  //   categorySelect,
  //   productTypeSelect,
  // }));

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
              <li
                className={categorySelect === item.id ? "active" : ""}
                onClick={() => {
                  setCategorySelect(item.id);
                  onFilterChange(item.id, productTypeSelect);
                }}
                key={item.id}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </li>
        <li className="shop-home_filter-item--40">
          <span className="shop-home_filter-item-title">选择类型</span>
          <ul className="shop-home_filter-category">
            {_.map(productTypeList, (item) => (
              <li
                className={productTypeSelect === item.id ? "active" : ""}
                key={item.id}
                onClick={() => {
                  setProductTypeSelect(item.id);
                  onFilterChange(categorySelect, item.id);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </li>
        <li className="shop-home_filter-item--50">
          <span>已选条件</span>
          <ul className="shop-home_filter-category">
            <li className="shop-home_filter-category--selection">
              {_.find(categoryList, (item) => item.id === categorySelect)?.name}
            </li>
            <li className="shop-home_filter-category--selection">
              {
                _.find(productTypeList, (item) => item.id === productTypeSelect)
                  ?.name
              }
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
