/*
 * @Date: 2020-07-14 15:37:18
 * @LastEditTime: 2020-07-24 20:13:15
 */

import React, { useEffect, useState } from 'react';
import { getQueryVariable } from '@/utils';
import { getStepCookie, setStepCookie } from '@/utils/auth';

import { getOrderInfo } from '@/services/pay';
import { message, Button } from 'antd';
import Step from './Step';
import ConfirmOrder from './ConfirmOrder';
import ConfirmPay from './ConfirmPay';
import PaySuccess from './PaySuccess';
import { connect } from 'dva';

const Pay = (props) => {
  const { location, amount, telephone, history } = props;
  const [step, setStep] = useState(2);
  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    initStep();
    initOrderInfo();
  }, []);

  const initStep = () => {
    if (location.state?.from) {
      setStepCookie(step);
    } else {
      const stepCookie = getStepCookie();
      setStep(parseInt(stepCookie));
    }
  };

  const initOrderInfo = async() => {
    try {
      const orderId = getQueryVariable('orderId');
      const [err, data, msg] = await getOrderInfo(orderId);
      if (!err) {
        setOrderInfo(data);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  const StepMap = {
    2: (orderInfo, changeStep) => (
      <ConfirmOrder orderInfo={orderInfo} changeStep={changeStep} />
    ),
    3: (orderInfo, changeStep) => (
      <ConfirmPay
        orderInfo={orderInfo}
        changeStep={changeStep}
        amount={amount}
        telephone={telephone}
        history={history}
      />
    ),
    4: () => <PaySuccess history={history} />,
  };

  return (
    <div className="page-pay">
      <div style={{ border: '1px solid #e6e6e6' }}>
        <div className="page-pay_header">星权益 / 采购订单</div>
        <Step step={step} />
        {StepMap[step](orderInfo, (step) => {
          setStep(step);
          setStepCookie(step);
        })}
      </div>
    </div>
  );
};

export default connect(({ account }) => ({
  amount: account.amountInfo.amount,
  telephone: account.user.telephone,
}))(Pay);
