/*
 * @Date: 2020-07-04 14:00:57
 * @LastEditTime: 2020-07-13 16:25:17
 */

import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";

export default (props) => {
  const {
    categoryList,
    productTypeList,
    onFilterChange,
    categoryLoading,
    productTypeLoading,
  } = props;
  const [categorySelect, setCategorySelect] = useState("");
  const [productTypeSelect, setProductTypeSelect] = useState("");

  useEffect(() => {
    if (categoryList.length) {
      setCategorySelect(categoryList[0].code);
      onFilterChange(categoryList[0].code, productTypeSelect);
    }
  }, [categoryList]);

  useEffect(() => {
    if (productTypeList.length) {
      setProductTypeSelect(productTypeList[0].code);
      onFilterChange(categorySelect, productTypeList[0].code);
    }
  }, [productTypeList]);

  return (
    <div className="shop-home_filter-wrapper">
      <ul>
        <li className="shop-home_filter-item--42">
          <span>请选择搜索条件</span>
        </li>
        <li className="shop-home_filter-item--40">
          <span className="shop-home_filter-item-title">选择行业</span>
          <ul className="shop-home_filter-category">
            <Skeleton
              loading={categoryLoading}
              active
              title={false}
              paragraph={{ rows: 2 }}
            >
              {_.map(categoryList, (item) => (
                <li
                  className={categorySelect === item.code ? "active" : ""}
                  onClick={() => {
                    setCategorySelect(item.code);
                    onFilterChange(item.code, productTypeSelect);
                  }}
                  key={item.code}
                >
                  {item.name}
                </li>
              ))}
            </Skeleton>
          </ul>
        </li>
        <li className="shop-home_filter-item--40">
          <span className="shop-home_filter-item-title">选择类型</span>
          <ul className="shop-home_filter-category">
            <Skeleton
              loading={productTypeLoading}
              active
              title={false}
              paragraph={{ rows: 1 }}
            >
              {_.map(productTypeList, (item) => (
                <li
                  className={productTypeSelect === item.code ? "active" : ""}
                  key={item.code}
                  onClick={() => {
                    setProductTypeSelect(item.code);
                    onFilterChange(categorySelect, item.code);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </Skeleton>
          </ul>
        </li>
        <li className="shop-home_filter-item--50">
          <span>已选条件</span>
          <ul className="shop-home_filter-category">
            <li className="shop-home_filter-category--selection">
              {
                _.find(categoryList, (item) => item.code === categorySelect)
                  ?.name
              }
            </li>
            <li className="shop-home_filter-category--selection">
              {
                _.find(
                  productTypeList,
                  (item) => item.code === productTypeSelect
                )?.name
              }
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
