/*
 * @Author: Dad
 * @Date: 2020-07-02 21:51:33
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-02 22:25:40
 */
import React from 'react';

import Func from '@/assets/images/dashboard/gongneng.png';
import Shop from '@/assets/images/dashboard/shop.png';
import DinDan from '@/assets/images/dashboard/dindan.png';
import LiuShui from '@/assets/images/dashboard/liushui.png';
import Dindan from '@/assets/images/dashboard/dindan.png';
import { Row, Col } from 'antd';

export default () => {

  return (
    <Row className="footer">
      <Col span={3}>
        <img src={Func} className="footer_leftImg--name" />
      </Col>
      <Col span={3}>
        <div className="footer_leftImg">
          <img src={Shop} />
        </div>
        <div className="footer_leftImg--desc">权益商城</div>
      </Col>
      <Col span={3}>
        <div className="footer_leftImg">
          <img src={DinDan} />
        </div>
        <div className="footer_leftImg--desc">采购订单</div>
      </Col>
      <Col span={3}>
        <div className="footer_leftImg">
          <img src={LiuShui} />
        </div>
        <div className="footer_leftImg--desc">资金流水</div>
      </Col>
      <Col span={3}>
        <div className="footer_leftImg">
          <img src={Dindan} />
        </div>
        <div className="footer_leftImg--desc">交易订单</div>
      </Col>
    </Row>
  );

};
