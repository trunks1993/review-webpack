/*
 * @Date: 2020-07-01 17:41:31
 * @LastEditTime: 2020-07-03 19:43:47
 */
import request from '@/utils/request';

/**
 * @name: 获取购物车数量
 * @param {}
 */
export async function getCountOfCar() {
  return request('/cart/countCartItem', {
    method: 'POST',
  });
}

/**
 * @name: 获取用户金额和冻结金额
 * @param {}
 */
export async function getAccount() {
  return request('/account/getAccount', {
    method: 'POST',
  });
}
