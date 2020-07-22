/*
 * @Date: 2020-07-15 16:39:54
 * @LastEditTime: 2020-07-22 21:41:21
 */

import React, { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import { sendAuthCode, pay } from '@/services/pay';
import { TRANSTEMP, PRECISION } from '@/const';
import { getFloat } from '@/utils';

export default (props) => {
  const { amount, telephone, orderInfo, changeStep } = props;
  const [loading, setLoading] = useState(false);
  const [timing, setTiming] = useState(false);
  const [time, setTime] = useState(60);
  const inputRef = React.createRef();

  let timer = null;

  const handleSendAuthCode = async() => {
    try {
      setLoading(true);
      const [err, data, msg] = await sendAuthCode(telephone);
      if (!err) {
        dispatchTimer();
      } else {
        setLoading(false);
        message.error(msg);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const dispatchTimer = () => {
    setTiming(true);
    setLoading(false);
    if (timer) return;
    let i = 1;
    timer = setInterval(() => {
      if (i < 60) {
        setTime(time - i++);
      } else {
        setTiming(false);
        clearTimeout(timer);
        setTime(60);
      }
    }, 1000);
  };

  const handlePay = async() => {
    const code = inputRef.current.state.value;
    if (!code) return message.error('请输入手机验证码');
    try {
      const [err, data, msg] = await pay({
        orderId: orderInfo.order.orderId,
        code,
      });
      if (!err) {
        changeStep(4);
      } else {
        message.error(msg);
      }
    } catch (error) {}
  };

  return (
    <div className="page-pay_confirm-pay">
      <div className="page-pay_confirm-pay-title">
        提交订单成功，请确认付款信息
      </div>
      <div className="page-pay_confirm-pay-warn">
        付款前，请务必仔细核对订单详情，避免重复充值、误充等情况。如有发生，需自行承担损失。
      </div>
      <ul className="page-pay_confirm-pay-content">
        <li className="confirm-pay-content_item">
          <span className="confirm-pay-content_item-title">支付方式：</span>
          <span>余额支付</span>
        </li>
        <li className="confirm-pay-content_item">
          <span className="confirm-pay-content_item-title">订单总额：</span>
          <span>
            ￥{getFloat(orderInfo?.sumInfo?.totalMoney / TRANSTEMP, PRECISION)}
          </span>
        </li>
        <li className="confirm-pay-content_item">
          <span className="confirm-pay-content_item-title">账户余额：</span>
          <span>￥{getFloat(amount / TRANSTEMP, PRECISION)}</span>
          <span style={{ marginLeft: '15px' }}>
            {amount < orderInfo?.sumInfo?.totalMoney ? (
              <>
                余额不足，
                <Button type="link" style={{ padding: 0 }}>
                  立即充值
                </Button>
              </>
            ) : (
              <>
                <Button type="link" style={{ padding: 0 }}>
                  充值
                </Button>
              </>
            )}
          </span>
        </li>
        <li className="confirm-pay-content_item">
          <span className="confirm-pay-content_item-title">手机号码：</span>
          <span>{telephone}</span>
        </li>
        <li className="confirm-pay-content_auth-code">
          <span className="confirm-pay-content_auth-code-title">
            短信验证码：
          </span>
          <Input
            ref={inputRef}
            style={{ width: '180px' }}
            size="large"
            className="byMessage_cst-input"
            addonAfter={
              <Button
                loading={loading}
                disabled={timing}
                type="link"
                onClick={handleSendAuthCode}
              >
                {timing ? time + 's' : !loading && '发送验证码'}
              </Button>
            }
          />
        </li>
      </ul>
      <div className="page-pay_confirm-pay-btn">
        <Button type="primary" onClick={handlePay}>
          确认付款
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={() => {
            changeStep(2);
          }}
        >
          取消
        </Button>
      </div>
    </div>
  );
};
