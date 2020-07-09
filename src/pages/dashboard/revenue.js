/*
 * @Author: Dad
 * @Date: 2020-07-02 21:04:21
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-02 21:50:20
 */
import React from 'react';
import { Row, Col } from 'antd';

import Unsj from '@/assets/images/dashboard/Unsj.png';

export default () => {

  return (
    <div className="trading">
      <Row>
        <Col span={12}>
          <div className="trading_title">
            收入(元)
          </div>
          <div className="trading_money">0.00</div>
        </Col>
        <Col span={12} className="trading_borderLeft">
          <div className="trading_title">
            支付
          </div>
          <div className="trading_money">0.00</div>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', marginTop: 30, fontSize: 13, color: '#999999' }}>
        <img src={Unsj} alt="" style={{ width: 120, height: 105 }} />
        <div>暂无数据</div>
      </div>
    </div>
  );
};
