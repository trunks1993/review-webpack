/*
 * @Date: 2020-07-01 11:32:59
 * @LastEditTime: 2020-07-03 20:11:41
 */
import React, { useEffect, useState } from 'react';
import UnNotice from './unNotice';
import MyBalance from './myBalance';
import Trading from './trading';
import Revenue from './revenue';
import Footer from './footer';
import UserInfo from './userInfo';
import PlatformNotice from './platformNotice';
import { Tabs, Icon, message } from 'antd';
import { connect } from 'dva';
import { getAccount } from '@/services/app';

const dashboard = ({ userList }) => {
  const [userMoney, setUserMoney] = useState({});
  /** 初始化加载用户金额 */
  useEffect(() => {
    async function getUserMoney() {
      const [err, data, msg] = await getAccount();
      if (!err){
        setUserMoney(data);
      } else message.error(msg);
    }
    getUserMoney();
  },[]);

  const operations = (
    <span className="myBalance_title--jump">
      <span className="myBalance_title--jumpText">更多交易</span>
      <Icon type="right-circle" />
    </span>
  );

  return (
    <div className="dashboard">
      <div className="dashboard_context--left">
        <UnNotice />
        <div className="dashboard_Content">
          <div className="dashboard_Content--left">
            <MyBalance user={userMoney} />
          </div>
          <div className="dashboard_Content--right">
            <div className="trading">
              <Tabs tabBarExtraContent={operations}>
                <Tabs.TabPane tab={<div className="trading_tabSize">昨日交易</div>} key="1">
                  <Trading />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<div className="trading_tabSize">昨日收支</div>} key="2">
                  <Revenue />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div className="dashboard_context--right">
        <UserInfo user={userList} />
        <PlatformNotice />
      </div>
    </div>
  );
};
export default connect(({ account }) => ({
  userList: account.user
}))(dashboard);
