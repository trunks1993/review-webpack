/*
 * @Author: Dad
 * @Date: 2020-07-02 10:39:33
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-02 16:36:42
 */

import React from 'react';

import notice from '@/assets/images/dashboard/xx.png';
import { Icon } from 'antd';

export default () => {
  return (
    <div className="unNotice">
      <img src={notice} alt="" className="unNotice_notice-img" />
      {'目前没有需要处理的代办通知'}
      <div className="unNotice_notice-right">
        <span className="unNotice_notice-right--text">{'查看更多'}</span>
        <Icon type="right-circle" />
      </div>
    </div>
  );
};
