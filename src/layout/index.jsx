import React from 'react';
import { Layout } from 'antd';
import { RouteList } from '@/router';

import { connect } from 'dva';

const { Footer } = Layout;
import Header from './Header/index';

const Comp = ({ carCount, user, dispatch, ...rest }) => {
  return (
    <div className="layout">
      <Header path={rest.location.pathname} history={rest.history} />
      <div className="layout_app-main">
        <RouteList path={rest.location.pathname} />
      </div>
      <Footer className="layout_footer">
        <div>Copyright © XJF All Rights Reserved</div>
        <div>领先的数字权益营销服务提供商</div>
      </Footer>
    </div>
  );
};

export default connect(({ app, account }) => ({
  carCount: app.carCount,
  user: account.user,
}))(Comp);
