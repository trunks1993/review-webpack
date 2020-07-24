/*
 * @Date: 2020-07-24 15:36:23
 * @LastEditTime: 2020-07-24 16:54:07
 */

import request from '@/utils/request';

/**
 * @name: 获取银行列表
 * @param {}
 */
export async function fetchList() {
  return request('/bankroll/loadRechargeChannelList', {
    method: 'POST',
  });
}

/**
 * @name: 充值提交
 * @param {}
 */
export async function addWorkorder(data) {
  return request('/bankroll/addWorkorder', {
    method: 'POST',
    data,
  });
}
