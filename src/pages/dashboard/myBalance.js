/*
 * @Author: Dad
 * @Date: 2020-07-02 16:08:20
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-03 19:48:14
 */
import React, { useState, useEffect } from 'react';
import { Icon, Button } from 'antd';

import eye from '@/assets/images/dashboard/eye.png';
import uneye from '@/assets/images/dashboard/unEye.png';
import get from '@/assets/images/dashboard/get.png';
import set from '@/assets/images/dashboard/set.png';

export default ({ user }) => {
  const [eyes, setEye] = useState(true);

  return (
    <div className="myBalance">
      <div className="myBalance_title">
        <span className="myBalance_title--text">我的余额</span>
        <span onClick={() => setEye(!eyes)}>
          <img src={eyes ? eye : uneye} className="myBalance_title--img" />
        </span>
        <span className="myBalance_title--jump">
          <span className="myBalance_title--jumpText">资金管理</span>
          <Icon type="right-circle" />
        </span>
      </div>
      <div className="myBalance_context">
        <div className="myBalance_contextLeft">
          <img src={get} className="myBalance_contextLeft--getImg" />
        </div>
        <div className="myBalance_contextRight">
          <div className="myBalance_contextRight--text">账户可用余额(元)</div>
          <div className="myBalance_contextRight--number">
              ￥{ eyes ? user.amount : '****.**' }
          </div>
        </div>
      </div>
      <div className="myBalance_context">
        <div className="myBalance_contextLeft">
          <img src={set} className="myBalance_contextLeft--getImg" />
        </div>
        <div className="myBalance_contextRight">
          <div className="myBalance_contextRight--text">冻结金额(元)</div>
          <div className="myBalance_contextRight--number">
              ￥{ eyes ? user.doorsillAmount : '****.**' }
          </div>
        </div>
      </div>
      <div className="myBalance_footer">
        <Button type="primary" className="myBalance_footer--addBut">充值</Button>
        <Button className="myBalance_footer--cutBut">提现</Button>
      </div>
    </div>
  );
};
