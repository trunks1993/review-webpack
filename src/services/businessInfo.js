/*
 * @Author: Dad
 * @Date: 2020-07-15 09:41:09
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-16 16:25:05
 */
import request from '@/utils/request';

/**
 * @name: 获取App
 * @param {}
 */
export async function getApp() {
  return request('/application/searchApplication', {
    method: 'POST',
  });
}
/**
 * @name: 删除App
 * @param {data}
 */
export async function deleteApp(data) {
  return request('/application/disableApplication', {
    method: 'POST',
    data,
  });
}
/**
 * @name: 获取Secret
 * @param {data}
 */
export async function getSecret(data) {
  return request('/application/getAppSecret', {
    method: 'POST',
    data,
  });
}
