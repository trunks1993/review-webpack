/*
 * @Date: 2020-07-02 19:14:16
 * @LastEditTime: 2020-07-04 14:06:39
 */

import React, { useEffect, useState } from 'react';
import FilterPanel from './FilterPanel';

import shopHomeBg from '@/assets/images/shop/shopHomeBg.png';
import {
  getCategoryList,
  getProductTypeList,
  getBrandList,
  getProductMap,
} from '@/services/shop';
import { message } from 'antd';

export default (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);

  useEffect(() => {
    initCategoryList();
    initProductTypeList();
  }, []);

  // getCategoryList
  // getProductTypeList
  // getBrandList
  // getProductMap

  const initCategoryList = async() => {
    try {
      const [err, data, msg] = await getCategoryList();
      if (!err) {
        setCategoryList(data);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };
  const initProductTypeList = async() => {
    try {
      const [err, data, msg] = await getProductTypeList();
    } catch (error) {}
  };

  const initBrandList = async() => {
    try {
      const [err, data, msg] = await getBrandList();
    } catch (error) {}
  };
  const initProductMap = async() => {
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
      />
    </div>
  );
};
