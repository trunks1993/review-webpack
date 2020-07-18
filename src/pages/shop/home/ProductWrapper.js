/*
 * @Date: 2020-07-13 14:58:17
 * @LastEditTime: 2020-07-17 10:27:46
 */

import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";

import _ from "lodash";

export default (props) => {
  const { productList, loading, history, productTypeCode } = props;

  const itemClick = (e, item) => {
    e.stopPropagation();
    history.push(
      `/admin/shop/item?productCode=${item.productCode}&brandCode=${item.brandCode}&productTypeCode=${productTypeCode}`
    );
  };

  return (
    <div className="shop-home_product-wrapper">
      <div className="shop-home_product-wrapper-content">
        <Skeleton
          loading={loading}
          active
          title={false}
          paragraph={{ rows: 2 }}
        >
          {_.map(
            _.filter(productList, (item, index) => index < 3),
            (item) => (
              <span
                className="shop-home_content-item"
                key={item.productCode}
                onClick={(e) => itemClick(e, item)}
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
