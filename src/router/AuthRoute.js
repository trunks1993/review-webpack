/*
 * @Date: 2020-06-20 17:03:19
 * @LastEditTime: 2020-06-20 17:28:55
 */ 
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '@/utils/auth';

const AuthRoute = ({ Component, authTo, user, getUserByToken, ...rest }) => (
  // eslint-disable-next-line complexity
  <Route {...rest} render={props => {
    const isLogin = props.match.path === '/login';
    const token = getToken();
    const c = <Component {...props} />;
    const r = <Redirect to={{ pathname: authTo, state: { from: props.location } }} />;
    // if (token) {
    //   // 如果有token 判断有没有用户信息没有就去拉取
    //   if (!user.id) {
    //     getUserByToken(token).then(
    //       () => !isLogin ? c : r,
    //       error => !isLogin ? r : c
    //     );
    //   }
    //   return !isLogin ? c : r;
    // }
    return !isLogin ? r : c;
  }
  }
  />
);

export default AuthRoute;