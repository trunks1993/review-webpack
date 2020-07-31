/*
 * @Author: Dad
 * @Date: 2020-07-14 16:26:54
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-31 11:28:22
 */
import React from 'react';

import UNHEAD from '@/assets/images/dashboard/Unhead.png';
import { Row, Col, Button } from 'antd';
import { MerchantStatus, UserTypes } from '@/const';
import { createHashHistory } from 'history';
const history = createHashHistory();

const user = ({ list }) => {
  return (
    <div className="user">
      <div className="user-title">
        <Row>
          <Col span={8}>
            <img
              src={list?.headIcon ? process.env.IMG_PREFIX + list?.headIcon : UNHEAD}
              alt=""
            />
          </Col>
          <Col span={16}>
            <span className="user-title--name">{list?.merchantName}</span>
          </Col>
        </Row>
      </div>
      <div className="user-desc">
        <Row>
          <Col span={7}> 登录账号: </Col>
          <Col span={13}> {list?.telephone} </Col>
          <Col span={7}> 商户号: </Col>
          <Col span={13}> {list?.merchantId} </Col>
          <Col span={7}> 认证类型: </Col>
          <Col span={17}> {UserTypes[list?.userType]} </Col>
          <Col span={7}> 认证状态: </Col>{' '}
          <Col span={17}> {MerchantStatus[list?.identityState]} </Col>
          <Col span={7}> 最近登录: </Col>{' '}
          <Col span={13}>
            {moment(list?.lastAccessTime).format('YYYY-MM-DD HH:MM:SS')}
          </Col>
        </Row>
        <Button
          type="primary"
          className="user-desc--left"
          onClick={() =>
            history.push('/admin/operations/businessInfo/certification')
          }
        >
          实名认证
        </Button>
        <Button
          className="user-desc--right"
          onClick={() => history.push('/admin/operations/businessInfo/account')}
        >
          账号管理
        </Button>
      </div>
    </div>
  );
};
export default user;
