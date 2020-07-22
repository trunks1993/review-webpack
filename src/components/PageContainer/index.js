/*
 * @Date: 2020-07-02 11:29:45
 * @LastEditTime: 2020-07-22 21:17:06
 */

import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import { asyncRoutes } from '@/router/config';
import { ChildRouteList } from '@/router';
import { createHashHistory } from 'history';
const history = createHashHistory();
import { flatTree } from '@/utils';
import _ from 'lodash';

const { Sider } = Layout;
const { SubMenu } = Menu;

const recursion = (dataSource) => {
  return dataSource.map((menu) => {
    if (menu.children) {
      return (
        <SubMenu
          key={menu.id}
          title={
            <span style={{ position: 'relative', left: '20px' }}>
              <i className={`iconfont ${menu.icon}`} />
              <span style={{ marginLeft: '10px' }}>{menu.title}</span>
            </span>
          }
        >
          {recursion(menu.children)}
        </SubMenu>
      );
    }
    return !menu.hidden ? (
      <Menu.Item key={menu.id} onClick={(e) => history.push(`${menu.path}`)}>
        <span style={{ position: 'relative', left: '20px' }}>
          <i className={`iconfont ${menu.icon}`} />
          <span style={{ marginLeft: menu.icon ? '10px' : null }}>
            {menu.title}
          </span>
        </span>
      </Menu.Item>
    ) : null;
  });
};

const SiderMenu = ({ menu, selectId, defaultOpenKeys }) => (
  <Menu
    mode="inline"
    selectedKeys={[`${selectId}`]}
    defaultOpenKeys={defaultOpenKeys}
  >
    {recursion(menu.children)}
  </Menu>
);

const PageContainer = (props) => {
  const { menu, location } = props;

  const pathname = location.pathname;
  const pathMap = flatTree(menu.children);
  let id = _.find(pathMap, (item) => item.path === pathname)?.id;
  if (!id) {
    id = _.find(pathMap, (item) => item.isHome)?.id;
  }

  const ids = _.map(menu.children, (item) => {
    if (item.children && item.children.length > 0) {
      return item.id.toString();
    }
    return false;

  }).filter((item) => item);

  return (
    <Layout className="page-container">
      <Sider width={180}>
        <div className="page-container_menu-title">
          <img src={menu.icon} />
          <div>{menu.title}</div>
        </div>
        <SiderMenu menu={menu} selectId={id} defaultOpenKeys={ids} />
      </Sider>
      <Layout style={{ marginLeft: '10px', overflowY: 'auto' }}>
        <ChildRouteList />
      </Layout>
    </Layout>
  );
};

// export default connect(({ routing }) => ({
//   path: routing.location.pathname,
// }))(PageContainer);
export default PageContainer;
