/*
 * @Date: 2020-06-23 10:24:25
 * @LastEditTime: 2020-06-28 19:32:33
 */

import React, { useState } from 'react';

import ByAccount from './ByAccount';

import ByMessage from './ByMessage';

import Container from '../Container';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default () => {
  return (
    <Container>
      <div className="sign-in">
        <Tabs defaultActiveKey="1" size="large" tabBarGutter={0}>
          <TabPane tab="账号登录" key="1">
            <ByAccount />
          </TabPane>
          <TabPane tab="短信登录" key="2">
            <ByMessage />
          </TabPane>
        </Tabs>
      </div>
    </Container>
  );
};
