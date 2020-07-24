/*
 * @Author: Dad
 * @Date: 2020-07-14 09:10:05
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-16 20:45:56
 */
import React from 'react';
import { Icon } from 'antd';
import Xx from '@/assets/images/dashboard/xx.png';

const title = () => {
  return (
    <div className="title">
      <img src={Xx} alt="" className="title-img" />
      <div className="title-desc">目前没有需要处理的代办通知</div>
      <div className="title-right">
        {'查看更多'}
        <Icon type="right-circle" style={{ marginLeft: 5 }} />
      </div>
    </div>
  );
};
export default title;
