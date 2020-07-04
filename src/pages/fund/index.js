/*
 * @Date: 2020-07-01 15:09:27
 * @LastEditTime: 2020-07-01 15:09:39
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
