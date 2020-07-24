/*
 * @Date: 2020-07-22 19:12:43
 * @LastEditTime: 2020-07-22 19:23:33
 */
import request from '@/utils/request';

/**
 * @name: 列表
 * @param {data}
 */
export async function fetchList(data) {
  return request('/account/searchAccountCheckSumList', {
    method: 'POST',
    data,
  });
}
