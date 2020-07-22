/*
 * @Date: 2020-07-22 16:37:43
 * @LastEditTime: 2020-07-22 16:38:08
 */

import request from '@/utils/request';

/**
 * @name: 列表
 * @param {data}
 */
export async function fetchList(data) {
  return request('/account/searchAccountTrace', {
    method: 'POST',
    data,
  });
}
