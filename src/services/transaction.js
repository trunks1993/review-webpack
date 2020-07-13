/*
 * @Author: Dad
 * @Date: 2020-07-13 15:49:35
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-13 21:13:15
 */
import request from '@/utils/request';

/**
 * @name: 查询列表
 * @param {QueryParamsType} data
 */
export async function queryList(data){
  return request('/trade/searchMerTradeOrderList', {
    method: 'POST',
    data,
  });
}

/**
 * @name: 查询列表
 * @param {QueryParamsType} data
 */
export async function queryReconList(data){
  return request('/trade/searchMerTradeCheckSumList', {
    method: 'POST',
    data,
  });
}
