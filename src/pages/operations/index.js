/*
 * @Date: 2020-07-01 15:06:53
 * @LastEditTime: 2020-07-02 18:44:31
 */
import React from 'react';
import { Layout } from 'antd';
import PageContainer from '@/components/PageContainer';

const { Header, Sider } = Layout;

export default (props) => {
  return (
    <PageContainer {...props} configId={props.configId} />
  );
};
