/*
 * @Date: 2020-07-02 11:29:45
 * @LastEditTime: 2020-07-03 16:11:58
 */

import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import { asyncRoutes } from '@/router/config';
import { ChildRouteList } from '@/router';
import { createHashHistory } from 'history';
const history = createHashHistory();
import { flatTree } from '@/utils';

const { Sider } = Layout;
const { SubMenu } = Menu;

const recursion = (dataSource, match) => {
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
          {recursion(menu.children, match)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item
        key={menu.id}
        onClick={(e) => history.push(`${match.url + menu.path}`)}
      >
        <span style={{ position: 'relative', left: '20px' }}>
          <i className={`iconfont ${menu.icon}`} />
          <span style={{ marginLeft: menu.icon ? '10px' : null }}>
            {menu.title}
          </span>
        </span>
      </Menu.Item>
    );
  });
};

const PageContainer = ({ menu, match, path }) => {
  const currentPath = path.split(match.path)[1];
  const id = flatTree(menu.children).find((item) => item.path === currentPath)
    ?.id;

  return (
    <Layout className="page-container">
      <Sider width={180}>
        <div className="page-container_menu-title">
          <img src={menu.icon} />
          <div>{menu.title}</div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[`${id}`]}
          defaultOpenKeys={['12']}
        >
          {recursion(menu.children, match)}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: '10px', overflowY: 'auto' }}>
        <ChildRouteList menus={menu.children} match={match} />
      </Layout>
    </Layout>
  );
};

export default connect(({ routing }) => ({
  path: routing.location.pathname,
}))(PageContainer);
