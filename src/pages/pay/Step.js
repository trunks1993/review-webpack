/*
 * @Date: 2020-07-15 10:38:21
 * @LastEditTime: 2020-07-15 10:40:51
 */
import React from "react";

export default (props) => {
  const { step } = props;
  return (
    <div className="page-pay_step">
      <ul>
        <li
          className={`page-pay_step-item ${
            step === 1 ? "active" : step > 1 ? "disabled" : ""
          }`}
        >
          1.选择商品
        </li>
        <li
          className={`page-pay_step-item ${
            step === 2 ? "active" : step > 2 ? "disabled" : ""
          }`}
        >
          2.确认订单信息
        </li>
        <li
          className={`page-pay_step-item ${
            step === 3 ? "active" : step > 3 ? "disabled" : ""
          }`}
        >
          3.确认付款
        </li>
        <li
          className={`page-pay_step-item ${
            step === 4 ? "active" : step > 4 ? "disabled" : ""
          }`}
        >
          4.完成购买
        </li>
      </ul>
    </div>
  );
};
