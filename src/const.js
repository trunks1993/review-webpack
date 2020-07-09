/*
 * @Date: 2020-06-30 11:17:03
 * @LastEditTime: 2020-07-03 16:33:18
 */

export const METHOD_POST = 'POST'; // post
export const DEFAULT_PAGE_NUM = 1; // 默认页码
export const DEFAULT_PAGE_SIZE = 10; // 默认每页条数
// 不需要带token的api
export const whiteUrls = [process.env.BASE_API + '/user/login'];

export const ATTEST_TYPE_1 = 0;
export const ATTEST_TYPE_2 = 1;
export const ATTEST_TYPE_3 = 2;
export const ATTEST_TYPE_4 = 3;
/** 认证类型 */
export const ATTEST_TYPE_ALL = {
  [ATTEST_TYPE_1]: '未知',
  [ATTEST_TYPE_2]: '个体工商户/个人',
  [ATTEST_TYPE_3]: '企业',
  [ATTEST_TYPE_4]: '政府',
};

export const ATTEST_STATUS_1 = 0;
export const ATTEST_STATUS_2 = 1;
export const ATTEST_STATUS_3 = 2;
export const ATTEST_STATUS_4 = 3;
/** 认证状态 */
export const ATTEST_STATUS_ALL = {
  [ATTEST_STATUS_1]: '未认证',
  [ATTEST_STATUS_2]: '待审核',
  [ATTEST_STATUS_3]: '驳回',
  [ATTEST_STATUS_4]: '已认证',
};

/** 交易类型 */
export const TRANSACTION_TYPE_1 = 0;
export const TRANSACTION_TYPE_2 = 1;

export const TRANSACTION_TYPE_ALL = {
  [TRANSACTION_TYPE_1]: '批采',
  [TRANSACTION_TYPE_2]: '直充',
};

/** 交易订单状态 */
export const TRANSACTION_STATUS_1 = 1;
export const TRANSACTION_STATUS_2 = 2;
export const TRANSACTION_STATUS_3 = 3;
export const TRANSACTION_STATUS_4 = 4;
export const TRANSACTION_STATUS_5 = 5;

export const TRANSACTION_STATUS_ALL = {
  [TRANSACTION_STATUS_1]: '初始',
  [TRANSACTION_STATUS_2]: '待处理',
  [TRANSACTION_STATUS_3]: '处理中',
  [TRANSACTION_STATUS_4]: '成功',
  [TRANSACTION_STATUS_5]: '失败',
};
