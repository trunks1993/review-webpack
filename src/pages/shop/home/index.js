/*
 * @Date: 2020-07-02 19:14:16
 * @LastEditTime: 2020-07-03 16:32:37
 */

import React from 'react';
import shopHomeBg from '@/assets/images/shop/shopHomeBg.png';
export default (props) => {
  return (
    <div className="shop-home">
      <img width="1010px" height="180px" src={shopHomeBg} />
      <div className="shop-home_sku-box">
        <ul>
          <li className="shop-home_sku-title">请选择搜索条件</li>
          <li className="shop-home_sku-1">选择行业</li>
          <li className="shop-home_sku-2">选择类型</li>
          <li className="shop-home_sku-selected">已选条件</li>
        </ul>
      </div>
    </div>
  );
};
