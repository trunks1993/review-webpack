/*
 * @Date: 2020-07-02 19:14:16
 * @LastEditTime: 2020-07-13 11:13:45
 */

import React, { useEffect, useState } from "react";
import FilterPanel from "./FilterPanel";

import shopHomeBg from "@/assets/images/shop/shopHomeBg.png";
import {
  getCategoryList,
  getProductTypeList,
  getBrandList,
  getProductMap,
} from "@/services/shop";
import { message, Pagination } from "antd";
import BrandItem from "./BrandItem";

export default (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [total, setTotal] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");

  useEffect(() => {
    initCategoryList();
    initProductTypeList();
  }, []);

  useEffect(() => {
    // initList();
  }, [currPage]);

  // getCategoryList
  // getProductTypeList
  // getBrandList
  // getProductMap

  const onFilterChange = (category, productType) => {
    setCategory(category);
  };

  const initCategoryList = async () => {
    try {
      const [err, data, msg] = await getCategoryList();
      if (!err) {
        setCategoryList(data);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  const initProductTypeList = async () => {
    try {
      const [err, data, msg] = await getProductTypeList();
      if (!err) {
        setProductTypeList(data);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  const initList = async () => {
    try {
      const [err, data, msg] = await getBrandList();
      if (!err) {
        setBrandList(data.list);
        setTotal(data.totalRecords);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  const initProductMap = async () => {
    try {
      const [err, data, msg] = await getProductMap();
    } catch (error) {}
  };

  return (
    <div className="shop-home">
      <img width="1010px" height="180px" src={shopHomeBg} />
      <FilterPanel
        categoryList={categoryList}
        productTypeList={productTypeList}
        onFilterChange={onFilterChange}
      />
      <div className="shop-home_product-wrapper">
        {_.map(brandList, (item) => (
          <BrandItem key={item.id} item={item} />
        ))}
      </div>

      <div>
        <Pagination
          current={currPage}
          onChange={() => setCurrPage(currPage)}
          defaultPageSize={6}
          total={total}
        />
        <span>共{total}条</span>
      </div>
    </div>
  );
};
