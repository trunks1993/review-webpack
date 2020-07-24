/*
 * @Author: Dad
 * @Date: 2020-07-17 14:47:27
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-24 16:50:09
 */

import React, { useState } from 'react';
import { Tabs } from 'antd';
import InterfaceConfig from './interfaceConfig';
import Monitor from './monitor';

const configApp = () => {
  const [tabKey, setTabKey] = useState('1');

  /** 跳转到异常监控页 */
  const jumpMonitor = () => {
    setTabKey('2');
  };
  return (
    <>
      <div className="shop-item_header">业务管理 / 接口配置</div>
      <div className="configApp">
        <div style={{ border: '1px solid #e6e6e6' }}>
          <Tabs
            className="configApp-content global-tabs"
            type="card"
            onChange={(activeKey) => setTabKey(activeKey)}
          >
            <Tabs.TabPane tab={'接口配置'} key="1">
              <InterfaceConfig jumpMonitor={jumpMonitor} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={'异常监控'} key="2">
              <Monitor />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default configApp;
