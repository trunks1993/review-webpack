import React from 'react';
import { Layout, Menu, Badge, Popover } from 'antd';
import { RouteList, asyncRoutes } from '@/router';
import { createHashHistory } from 'history';
const history = createHashHistory();
import { connect } from 'dva';
import { removeToken } from '@/utils/auth';

const { Header, Sider } = Layout;

import icon1 from '@/assets/images/layout/icon1.png';
import icon2 from '@/assets/images/layout/icon2.png';
import noImg from '@/assets/images/global/no-img.png';

const FuncContext = React.createContext(() => {});

const DropMenu = () => (
  <FuncContext.Consumer>
    {(dispatch) => (
      <div className="layout_drop-menu">
        <ul>
          <li onClick={() => history.push('/changeUser')}>修改资料</li>
          <li onClick={() => history.push('/changePassword')}>修改密码</li>
          <li
            onClick={() => {
              removeToken();
              window.location.href = '/';
            }}
          >
            退出登录
          </li>
        </ul>
      </div>
    )}
  </FuncContext.Consumer>
);

const Name = ({ user, loading }) => (
  <Popover placement="bottom" content={<DropMenu />} trigger="hover">
    <span>
      <img
        className="layout_header-img"
        src={`${user.headIcon ? process.env.FILE_URL + user.headIcon : noImg}`}
      />
    </span>
  </Popover>
);

const Comp = ({ match, carCount, user, dispatch }) => (
  <Layout>
    <Header>
      <div className="layout_header-main">
        <div className="logo">
          <img
            width="81px"
            height="37px"
            src={process.env.FILE_URL + '/data/static/img/100001.png'}
          />
          <span className="layout_header-logo">助力企业数字化转型</span>
        </div>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '60px' }}>
          {_.map(
            asyncRoutes,
            (item) => !item.hidden && (
              <Menu.Item
                key={item.id}
                onClick={(e) => history.push(`${match.url + item.path}`)}
              >
                {item.title}
              </Menu.Item>
            )
          )}
          <Menu.Item onClick={(e) => window.open('')}>文档中心</Menu.Item>
        </Menu>

        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '60px' }}>
          <Menu.Item onClick={(e) => history.push(`${match.url}/message`)}>
            <img className="layout_header-icon" src={icon2} />
            <span>消息(2)</span>
          </Menu.Item>
          <Menu.Item onClick={(e) => history.push(`${match.url}/car`)}>
            <Badge dot={carCount}>
              <img className="layout_header-icon" src={icon1} />
            </Badge>
            <span>购物车</span>
          </Menu.Item>
          <FuncContext.Provider value={dispatch}>
            <Name user={user} />
          </FuncContext.Provider>
        </Menu>
      </div>
    </Header>
    <Layout>
      <Layout style={{ padding: '0 24px 24px' }}>
        <RouteList match={match} />
      </Layout>
    </Layout>
  </Layout>
);

export default connect(({ app, account }) => ({
  carCount: app.carCount,
  user: account.user,
}))(Comp);
