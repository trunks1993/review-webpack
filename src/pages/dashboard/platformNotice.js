/*
 * @Author: Dad
 * @Date: 2020-07-03 10:03:18
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-03 10:52:25
 */
import React from 'react';
import { Icon } from 'antd';

import Unxx from '@/assets/images/dashboard/Unxx.png';

export default () => {
  return (
    <div className="platformNotice">
      <div className="platformNotice_head">
        <div className="platformNotice_head--left">
          平台公告
        </div>
        <div className="platformNotice_head--right">
          更多消息
          <Icon type="right-circle" />
        </div>
      </div>
      <div className="platformNotice_context">
        <div className="platformNotice_context--img">
          <img src={Unxx} />
        </div>
      </div>
    </div>
  );
};
