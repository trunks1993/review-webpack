/*
 * @Date: 2020-06-30 11:17:03
 * @LastEditTime: 2020-07-13 21:38:53
 */

export const METHOD_POST = 'POST'; // post

// 不需要带token的api
export const whiteUrls = [process.env.BASE_API + '/user/login'];

export const ORDER_TYPE_0 = 0;
export const ORDER_TYPE_1 = 1;
export const ORDER_TYPE_2 = 2;
/** 订单类型 */
export const ORDER_TYPE_ALL = {
  [ORDER_TYPE_0]: '全部',
  [ORDER_TYPE_1]: '批采',
  [ORDER_TYPE_2]: '直充',
};

export const ORDER_STATUS_1 = 1;
export const ORDER_STATUS_2 = 2;
export const ORDER_STATUS_3 = 3;
export const ORDER_STATUS_4 = 4;
export const ORDER_STATUS_5 = 5;

/** 订单状态 */
export const ORDER_STATUS_ALL = {
  [ORDER_STATUS_1]: '初始',
  [ORDER_STATUS_2]: '待处理',
  [ORDER_STATUS_3]: '处理中',
  [ORDER_STATUS_4]: '成功',
  [ORDER_STATUS_5]: '失败',
};

export const RECONCILIATION_STATUS_0 = 0;
export const RECONCILIATION_STATUS_1 = 1;
export const RECONCILIATION_STATUS_2 = 2;

/** 对账状态 */
export const RECONCILIATION_STATUS_ALL = {
  [ORDER_STATUS_1]: '待生成',
  [ORDER_STATUS_2]: '生成中',
  [ORDER_STATUS_3]: '已生成',
};

export const ACCOUNT_INFO_1 = 1;
export const ACCOUNT_INFO_2 = 2;
export const ACCOUNT_INFO_3 = 3;

export const ACCOUNT_INFO_ALL = {
  [ACCOUNT_INFO_1]: '管理员',
  [ACCOUNT_INFO_2]: '运营',
  [ACCOUNT_INFO_3]: '财务',

};
