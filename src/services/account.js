/*
 * @Date: 2020-06-30 11:25:08
 * @LastEditTime: 2020-07-16 21:12:34
 */

import request from '@/utils/request';

/**
 * @name: 登录
 * @param {data}
 */
export async function fakeAccountLogin(data) {
  return request('/user/login', {
    method: 'POST',
    data,
  });
}

/**
 * @name: 获取用户信息
 * @param {type}
 */
export async function getUserInfo() {
  return request('/user/getUserInfo', {
    method: 'POST',
  });
}

/**
 * @name: 获取余额信息
 * @param {type}
 */
export async function getAccountInfo() {
  return request('/account/getAccount', {
    method: 'POST',
  });
}

/**
 * @name: 获取购物车
 * @param {type} 
 */
export async function getCarData() {
  return request('/cart/loadCart', {
    method: 'POST',
  });
}
