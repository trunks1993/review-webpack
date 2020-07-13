/*
 * @Date: 2020-07-02 11:29:45
 * @LastEditTime: 2020-07-04 13:38:13
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
    return (
      <Menu.Item key={menu.id} onClick={(e) => history.push(`${menu.path}`)}>
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

const SiderMenu = ({ menu }) => (
  <Menu
    mode="inline"
    // defaultSelectedKeys={[`${id}`]}
    // defaultOpenKeys={['12']}
  >
    {recursion(menu.children)}
  </Menu>
);

const PageContainer = ({ menu }) => {
  // const currentPath = path.split(match.path)[1];
  // const id = flatTree(menu.children).find((item) => item.path === currentPath)
  //   ?.id;
  return (
    <Layout className="page-container">
      <Sider width={180}>
        <div className="page-container_menu-title">
          <img src={menu.icon} />
          <div>{menu.title}</div>
        </div>
        <SiderMenu menu={menu} />
      </Sider>
      <Layout style={{ marginLeft: '10px', overflowY: 'auto' }}>
        <ChildRouteList />
      </Layout>
    </Layout>
  );
};

export default connect(({ routing }) => ({
  path: routing.location.pathname,
}))(PageContainer);
