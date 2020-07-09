/*
 * @Author: Dad
 * @Date: 2020-07-03 09:37:20
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-03 21:27:47
 */
import React from 'react';

import Unhead from '@/assets/images/dashboard/Unhead.png';
import { Button } from 'antd';
import { ATTEST_TYPE_ALL, ATTEST_STATUS_ALL } from '@/const';

export default ({ user }) => {
  return (
    <div className="user">
      <div className="user_head">
        {
          user?.headIcon ? (
            <img src={process.env.IMG_PREFIX + user?.headIcon} alt="" className="user_head--img" />
          ) : (
            <img src={Unhead} className="user_head--img" />
          )
        }
        <div className="user_head--text">{user.merchantName}</div>
      </div>
      <div className="user_context">
        <div className="user_context--desc">
          <span className="user_context--title">登录账号:</span>
          {user?.telephone}
        </div>
        <div className="user_context--desc">
          <span className="user_context--title">商户账号:</span>
          {user?.custId}
        </div>
        <div className="user_context--desc">
          <span className="user_context--title">认证类型:</span>
          {ATTEST_TYPE_ALL[user?.userType]}
        </div>
        <div className="user_context--desc">
          <span className="user_context--title">认证状态:</span>
          {ATTEST_STATUS_ALL[user?.identityState]}
        </div>
        <div className="user_context--desc">
          <span className="user_contextDesc--title">最近登录:</span>
          {user?.lastAccessTime}
        </div>
      </div>
      <div className="user_footer">
        <Button type="primary" className="user_footer--addBut">实名认证</Button>
        <Button className="user_footer--cutBut">账户管理</Button>
      </div>
    </div>
  );
};
