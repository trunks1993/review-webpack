/*
 * @Date: 2020-07-10 17:36:52
 * @LastEditTime: 2020-07-10 17:37:34
 */

import React, { useState, useEffect } from "react";

export default (props) => {
  const { item } = props;

  return <div className="shop-home_filter-wrapper">{item.name}</div>;
};
