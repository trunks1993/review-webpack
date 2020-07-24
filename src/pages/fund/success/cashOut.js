/*
 * @Date: 2020-07-24 17:20:08
 * @LastEditTime: 2020-07-24 17:46:52
 */

import React, { useState, useEffect } from "react";
import success from "@/assets/images/pay/success.png";
import { Button } from "antd";

const CashOutSuccess = (props) => {
  const { history, location } = props;
  useEffect(() => {
    if (
      !location?.state?.from ||
      location.state.from !== "/admin/fund/cashOut"
    ) {
      history.push("/admin/fund/cashOut");
    }
  }, []);

  return (
    <div className="fund-recharge">
      <div className="fund-recharge_header">{"资金管理 > 提现 > 提现成功"}</div>
      <div className="fund-recharge_content">
        <p className="fund-recharge_content-info">
          温馨提示：按人民银行反洗钱要求，提现账户需为对公账户或者企业负责人对私账户。提现申请提交成功后，公司每天将按分两次打款，请留意银行到账信息，打款时
          间如下：上午10: 00 ~ 11: 00, 下午14: 00 ~ 15: 00。
        </p>

        <p className="fund-recharge_content-p1">提现成功!</p>
        <div style={{ textAlign: "center" }}>
          <img src={success} />
        </div>
        <p className="fund-recharge_content-p2">
          提现成功，请留意银行到账信息!
        </p>
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            ghost
            onClick={() => history.push("/admin/dashboard")}
          >
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CashOutSuccess;
