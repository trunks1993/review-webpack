/*
 * @Author: Dad
 * @Date: 2020-07-14 17:23:44
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-14 17:54:06
 */
import React from 'react';
import { Icon } from 'antd';
import UNXX from '@/assets/images/dashboard/Unxx.png';

const platform = () => {
  return (
    <div className="platform">
      <div className="platform-title">
                平台公告
        <span className="context-left--right">更多消息<Icon type="right-circle" style={{ marginLeft: 5 }} /></span>
      </div>
      <div className="context-sj">
        <img src={UNXX} alt="" />
      </div>
    </div>
  );
};
export default platform;
