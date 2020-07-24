/*
 * @Author: Dad
 * @Date: 2020-07-24 15:43:59
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-24 16:18:10
 */
import request from '@/utils/request';

/**
 * @name: 财务流水查询
 * @param {data}
 */
export async function searchAccountTrace(data) {
  return request('/account/searchAccountTrace', {
    method: 'POST',
    data,
  });
}
