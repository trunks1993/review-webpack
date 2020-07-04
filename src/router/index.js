/*
 * @Date: 2020-06-20 17:03:03
 * @LastEditTime: 2020-07-03 16:17:38
 */
import React from 'react';
import { routerRedux, Route, Redirect, Switch } from 'dva/router';
import _ from 'lodash';

import { flatTree } from '@/utils';
import { getToken } from '@/utils/auth';
const { ConnectedRouter } = routerRedux;

import { asyncRoutes } from './config';

import AuthRoute from './AuthRoute';

import SignIn from '@/pages/account/signIn';
import SignUp from '@/pages/account/SignUp';
import ResetPassword from '@/pages/account/resetPassword';

import Layout from '@/layout';
import Page404 from '@/pages/page404';

// layout下的子模块
import Dashboard from '@/pages/dashboard';
import ShopHome from '@/pages/shop/home';

export default ({ history }) => {
  return (
    <ConnectedRouter history={history}>
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
    </ConnectedRouter>
  );
};

export const RouteList = ({ match }) => (
  <Switch>
    {_.map(asyncRoutes, (item, index) => (
      <Route
        path={`${match.path + item.path}`}
        key={index}
        component={(p) => {
          const menu = _.find(asyncRoutes, (r) => r.id === item.id);
          return <item.component {...p} menu={menu} />;
        }}
      />
    ))}
    <Route component={Dashboard} />
  </Switch>
);

export const ChildRouteList = ({ menus, match }) => (
  <Switch>
    {flatTree(menus)
      .filter((item) => item.component)
      .map((item, index) => {
        return (
          <Route
            path={`${match.path + item.path}`}
            key={index}
            component={item.component}
          />
        );
      })}
    <Route component={ShopHome} />
  </Switch>
);
