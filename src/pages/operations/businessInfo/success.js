/*
 * @Author: Dad
 * @Date: 2020-07-21 15:32:40
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-21 16:15:51
 */

import React from 'react';
import { Result, Button } from 'antd';
import successImg from '@/assets/images/operations/success.png';
import { createHashHistory } from 'history';
const history = createHashHistory();

const success = ({ title, desc }) => {
  return (
    <div className="success">
      <div className="success-title">{title}</div>
      <div>
        <img src={successImg} alt="" />
      </div>
      <div className="success-desc">{desc}</div>
      <div>
        <Button
          className="success-btn"
          onClick={() => history.push('/admin/dashboard')}
        >
          返回首页
        </Button>
      </div>
    </div>
  );
};
export default success;
