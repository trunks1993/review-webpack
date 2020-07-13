/*
 * @Date: 2020-07-13 14:58:17
 * @LastEditTime: 2020-07-13 16:13:50
 */

import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";

import _ from "lodash";

export default (props) => {
  const { productList, loading } = props;

  const itemClick = (e, productCode) => {
    e.stopPropagation();
    console.log(productCode);
  };

  return (
    <div className="shop-home_product-wrapper">
      <div className="shop-home_product-wrapper-content">
        <Skeleton loading={loading} active title={false} paragraph={{ rows: 2 }}>
          {_.map(
            _.filter(productList, (item, index) => index < 3),
            (item) => (
              <span
                className="shop-home_content-item"
                key={item.productCode}
                onClick={(e) => itemClick(e, item.productCode)}
              >
                {item.productName}
              </span>
            )
          )}
          {productList.length > 3 ? (
            <span className="shop-home_content-item--ellipsis">......</span>
          ) : null}
        </Skeleton>
      </div>
    </div>
  );
};
