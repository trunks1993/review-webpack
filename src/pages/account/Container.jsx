/*
 * @Date: 2020-06-23 10:24:25
 * @LastEditTime: 2020-07-21 20:54:48
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Context, SignInLoadingContext } from './Context';

import icon1 from '@/assets/images/login/icon1.png';
import icon2 from '@/assets/images/login/icon2.png';
import icon3 from '@/assets/images/login/icon3.png';
import icon4 from '@/assets/images/login/icon4.png';
import logo from '@/assets/images/login/logo.png';

const Login = ({ signInLoading, dispatch, children }) => {
  /**
   * @name: 登录
   * @param {form}
   */
  const handleLogin = (form, callback) => {
    form.validateFields((err, value) => {
      if (!err) {
        dispatch({
          type: 'account/login',
          payload: value,
          callback,
        });
      }
    });
  };

  return (
    <div className="login">
      <span className="login_login-title">助力企业数字化转型</span>
      <img src={logo} className="login_login-img--logo" />
      <img src={icon2} className="login_login-img--leftDown" />
      <img src={icon3} className="login_login-img--rightDown" />
      <img src={icon4} className="login_login-img--rightTop" />
      <div className="login_img-box">
        <img className="login_login-img" src={icon1} />
      </div>

      <Context.Provider value={handleLogin}>
        <SignInLoadingContext.Provider value={signInLoading}>
          <div className="login_login-box">{children}</div>
        </SignInLoadingContext.Provider>
      </Context.Provider>
    </div>
  );
};

export default connect(({ account, loading }) => ({
  signInLoading: loading.effects['account/login'],
}))(Login);
