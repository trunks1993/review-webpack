/*
 * @Author: Dad
 * @Date: 2020-07-14 18:05:25
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-14 18:11:05
 */
import request from '@/utils/request';

/**
 * @name: 获取余额
 * @param {}
 */
export async function getAccount() {
  return request('/account/getAccount', {
    method: 'POST'
  });
}
