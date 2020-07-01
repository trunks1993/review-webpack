/*
 * @Date: 2020-06-20 17:03:19
 * @LastEditTime: 2020-06-30 21:08:19
 */
import React from 'react';
import { connect } from 'dva';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '@/utils/auth';

const AuthRoute = ({ Component, authTo, user, dispatch, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogin = props.match.path === '/signIn';
      const token = getToken();
      const c = <Component {...props} />;
      const r = (
        <Redirect to={{ pathname: authTo, state: { from: props.location } }} />
      );
      if (token) {
        // 如果有token 判断有没有用户信息没有就去拉取
        if (!user.id) dispatch({
          type: 'account/setUser',
        });
        return !isLogin ? c : r;
      }
      return isLogin ? c : r;
    }}

  />
);

// export default AuthRoute;
export default connect(({ account }) => ({
  user: account.user,
}))(AuthRoute);
