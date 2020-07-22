/*
 * @Date: 2020-07-22 13:52:04
 * @LastEditTime: 2020-07-22 15:11:28
 */

import request from '@/utils/request';

/**
 * @name: 列表
 * @param {data}
 */
export async function fetchList(data) {
  return request('/bankroll/searchRechargeWorkorderList', {
    method: 'POST',
    data,
  });
}

/**
 * @name: 详情
 * @param {data}
 */
export async function getInfo(id) {
  return request('/bankroll/getRechargeChannelInfo', {
    method: 'POST',
    data: {
      id,
    },
  });
}

/**
 * @name: 修改
 * @param {data}
 */
export async function modify(data) {
  return request('/bankroll/modifyRechargeWorkorder', {
    method: 'POST',
    data,
  });
}
