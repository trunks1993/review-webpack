/*
 * @Date: 2020-07-15 16:39:42
 * @LastEditTime: 2020-07-30 14:45:28
 */

import React, { useEffect } from 'react';
import { Button } from 'antd';
import success from '@/assets/images/pay/success.png';

export default (props) => {
  const { history, dispatch } = props;
  useEffect(() => {
    dispatch({ type: 'account/setAmount' });
  }, []);
  return (
    <div className="page-pay_pay-success">
      <div className="page-pay_pay-success-title">恭喜您购买成功！</div>
      <img src={success} />
      <div className="page-pay_pay-success-title--sub">
        购买成功后，您可以去采购订单中查看提取您购买的商品
      </div>
      <Button
        type="primary"
        ghost
        onClick={() => history.push({ pathname: '/admin/shop/purchaseOrder' })}
      >
        去查看
      </Button>
    </div>
  );
};
