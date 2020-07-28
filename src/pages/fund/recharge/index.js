/*
 * @Date: 2020-07-24 08:57:48
 * @LastEditTime: 2020-07-28 15:59:06
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { getFloat } from '@/utils';
import { TRANSTEMP, PRECISION } from '@/const';
import { InputNumber, List, message, Button } from 'antd';
import { fetchList, addWorkorder } from '@/services/recharge';

const Recharge = (props) => {
  const { amount, history, location } = props;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectItemCode, setSelectItemCode] = useState('');

  useEffect(() => {
    getBankList();
  }, []);

  useEffect(() => {
    if (list && list.length > 0) setSelectItemCode(list[0].code);
  }, [list]);

  const inputNumberRef = React.createRef();

  const getBankList = async() => {
    try {
      setLoading(true);
      const [err, data, msg] = await fetchList();
      setLoading(false);
      if (!err) {
        setList(data);
      } else message.error(msg);
    } catch (error) {}
  };

  const submit = async() => {
    const amount = inputNumberRef.current.inputNumberRef.state.value;
    if (!amount) return message.error('充值金额不能为空');
    const selectItem = _.find(list, (item) => item.code === selectItemCode);
    const { code, accountNo, bankName } = selectItem;
    try {
      const [err, data, msg] = await addWorkorder({
        amount: amount * TRANSTEMP,
        rechargeChannel: code,
        accountNo,
        bankName,
      });
      if (!err) {
        history.push({
          pathname: '/admin/fund/rechargeSuccess',
          state: { from: location.pathname },
        });
      } else message.error(msg);
    } catch (error) {}
  };

  return (
    <div className="fund-recharge">
      <div className="fund-recharge_header">{'资金管理 > 充值'}</div>
      <div className="fund-recharge_content">
        <p className="fund-recharge_content-info">
          温馨提示：受银行处理时间影响，采用外汇或者线下汇款方式到账会有延误，强烈建议采用支付宝、网银实时到账。线下汇款直接向我司专属账户汇款，公司每天将按汇款
          时间顺序分两次加款，上午10: 00 ~ 11: 00, 下午14: 00 ~ 15:
          00,请避免北京时间21: 00 ~ 00:
          00进行汇款，否则受银行出账时间影响，可能出现延迟一天到账情况。
        </p>
        <div className="fund-recharge_content-form">
          <span className="fund-recharge_content-form-item">
            <span>当前余额：</span>
            <span>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {getFloat(amount / TRANSTEMP, PRECISION)}
              </span>
              元
            </span>
          </span>

          <span className="fund-recharge_content-form-item">
            <span>充值金额：</span>
            <span>
              <InputNumber
                precision={0}
                min={1}
                max={1000000}
                defaultValue={1}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                size="large"
                ref={inputNumberRef}
              />
            </span>
          </span>

          <div className="fund-recharge_content-form-list">
            <span>充值方式：</span>
            <ul>
              {_.map(list, (item) => (
                <li
                  key={item.id}
                  className={selectItemCode === item.code ? 'active' : ''}
                  onClick={()=> setSelectItemCode(item.code)}
                >
                  <div className="item-img-box">
                    <img src={process.env.FILE_URL + item.bankIcon} />
                  </div>
                  {selectItemCode === item.code ? (
                    <div className="item-info-box">
                      <span className="item-info-box_item">
                        开户银行: {item.bankName}
                      </span>
                      <span className="item-info-box_item">
                        开户名称: {item.accountName}
                      </span>
                      <span className="item-info-box_item">
                        汇款账号: {item.accountNo}
                      </span>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="fund-recharge_content-form-btn">
            <Button type="primary" onClick={submit}>
              提交
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ account }) => ({
  amount: account.amountInfo.amount,
}))(Recharge);
