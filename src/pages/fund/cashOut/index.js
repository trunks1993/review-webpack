/*
 * @Date: 2020-07-24 08:58:07
 * @LastEditTime: 2020-07-24 17:53:29
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { getFloat } from '@/utils';
import { TRANSTEMP, PRECISION } from '@/const';
import { InputNumber, List, message, Button } from 'antd';

const CashOut = (props) => {
  const { amount, history, location } = props;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectItemCode, setSelectItemCode] = useState('');

  const inputNumberRef = React.createRef();

  const submit = async() => {
    history.push({
      pathname: '/admin/fund/cashOutSuccess',
      state: { from: location.pathname },
    });
  };

  return (
    <div className="fund-recharge">
      <div className="fund-recharge_header">{'资金管理 > 提现'}</div>
      <div className="fund-recharge_content">
        <p className="fund-recharge_content-info">
          温馨提示：按人民银行反洗钱要求，提现账户需为对公账户或者企业负责人对私账户。提现申请提交成功后，公司每天将按分两次打款，请留意银行到账信息，打款时
          间如下：上午10: 00 ~ 11: 00, 下午14: 00 ~ 15: 00。
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
            <span>提现金额：</span>
            <span>
              <InputNumber
                precision={0}
                min={1}
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
            <span>提现账户：</span>
            <ul>
              {_.map(list, (item) => (
                <li
                  key={item.id}
                  className={selectItemCode === item.code ? 'active' : ''}
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
}))(CashOut);
