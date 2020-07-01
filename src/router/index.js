/*
 * @Date: 2020-06-20 17:03:03
 * @LastEditTime: 2020-07-01 16:53:09
 */
import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRoute from './AuthRoute';

import SignIn from '@/pages/account/signIn';
import SignUp from '@/pages/account/SignUp';
import ResetPassword from '@/pages/account/resetPassword';

import Layout from '@/layout';
import Page404 from '@/pages/page404';

import { flatTree } from '@/utils';
import { getToken } from '@/utils/auth';

// layout下的子模块
import Dashboard from '@/pages/dashboard';
import Shop from '@/pages/shop';
import Operations from '@/pages/operations';
import Fund from '@/pages/fund';

// 动态路由
export const asyncRoutes = [
  {
    id: 0,
    title: '首页',
    path: '',
    component: Dashboard,
  },
  {
    id: 1,
    title: '权益商城',
    component: Shop,
    path: '/shop',
    children: [
      {
        id: 11,
        title: '戒毒人员管理',
        path: '/dashboard',
        component: Dashboard,
      },
    ],
  },
  {
    id: 2,
    title: '运营管理',
    component: Operations,
    path: '/operations',
    children: [
      {
        id: 21,
        title: '戒毒人员管理',
        path: '/dashboard',
        component: Dashboard,
      },
    ],
  },
  {
    id: 3,
    title: '资金管理',
    component: Fund,
    path: '/fund',
    children: [
      {
        id: 31,
        title: '戒毒人员管理',
        path: '/dashboard',
        component: Dashboard,
      },
    ],
  },
  {
    id: 4,
    title: '消息',
    path: '/message',
    hidden: true,
    component: Dashboard,
  },
  {
    id: 5,
    title: '购物车',
    path: '/car',
    hidden: true,
    component: Dashboard,
  },
];

export default () => (
  <HashRouter>
    <Switch>
      <AuthRoute exact path="/signIn" authTo="/" Component={SignIn} />
      <AuthRoute
        exact
        path="/resetPassword"
        authTo="/"
        component={ResetPassword}
      />
      <AuthRoute exact path="/signUp" authTo="/" component={SignUp} />
      <AuthRoute path="/admin" authTo="/signIn" Component={Layout} />
      <Redirect from="/" to="/admin" />
      <Route component={Page404} />
    </Switch>
  </HashRouter>
);

export const RouteList = ({ match }) => (
  <Switch>
    {flatTree(asyncRoutes)
      .filter((item) => item.component)
      .map((item, index) => (
        <Route
          exact
          path={`${match.path + item.path}`}
          key={index}
          component={item.component}
        />
      ))}
    <Route path={match.path} Component={Dashboard} />
    <Route component={Page404} />
  </Switch>
);
