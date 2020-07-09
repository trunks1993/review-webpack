/*
 * @Author: Dad
 * @Date: 2020-07-02 19:43:33
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-02 21:48:17
 */
import React from 'react';
import { Row, Col } from 'antd';

import Unsj from '@/assets/images/dashboard/Unsj.png';

export default () => {

  return (
    <div className="trading">
      <Row>
        <Col span={8}>
          <div className="trading_title">
            成功交易金额(元)
          </div>
          <div className="trading_money">0.00</div>
        </Col>
        <Col span={8} className="trading_border">
          <div className="trading_title">
            交易成功率
          </div>
          <div className="trading_money">100.00%</div>
        </Col>
        <Col span={8}>
          <div className="trading_title">
            成功交易笔数
          </div>
          <div className="trading_money">0</div>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', marginTop: 30, fontSize: 13, color: '#999999' }}>
        <img src={Unsj} alt="" style={{ width: 120, height: 105 }} />
        <div>暂无数据</div>
      </div>
    </div>
  );
};
