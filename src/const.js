/*
 * @Date: 2020-06-30 11:17:03
 * @LastEditTime: 2020-07-22 17:34:35
 */

export const METHOD_POST = 'POST'; // post
export const DEFAULT_PAGE_NUM = 1; // 默认页码
export const DEFAULT_PAGE_SIZE = 7; // 默认每页条数

// 不需要带token的api
export const whiteUrls = [process.env.BASE_API + '/user/login'];

export const ORDER_STATUS_1 = 1; // 待付款
export const ORDER_STATUS_2 = 2; // 待发货
export const ORDER_STATUS_3 = 3; // 正在发货
export const ORDER_STATUS_4 = 4; // 已完成
export const ORDER_STATUS_5 = 5; // 已取消

export const OrderStatus = {
  [ORDER_STATUS_1]: '待付款',
  [ORDER_STATUS_2]: '待发货',
  [ORDER_STATUS_3]: '正在发货',
  [ORDER_STATUS_4]: '已完成',
  [ORDER_STATUS_5]: '已取消',
};

// 商品类型常量
export const PRODUCT_TYPE_1 = 101; // 卡密
export const PRODUCT_TYPE_2 = 102; // 兑换码
export const PRODUCT_TYPE_3 = 103; // 短链接
export const PRODUCT_TYPE_4 = 104; // 直充

export const ProductTypes = {
  [PRODUCT_TYPE_1]: '卡密',
  [PRODUCT_TYPE_2]: '兑换码',
  [PRODUCT_TYPE_3]: '短链接',
  [PRODUCT_TYPE_4]: '直充',
};

export const TRACE_STATUS_1 = 1; // 初始
export const TRACE_STATUS_2 = 2; // 已支付
export const TRACE_STATUS_3 = 3; // 处理中
export const TRACE_STATUS_4 = 4; // 待工单处理
export const TRACE_STATUS_5 = 5; // 成功
export const TRACE_STATUS_6 = 6; // 失败
export const TRACE_STATUS_7 = 7; // 取消

export const TraceStatus = {
  [TRACE_STATUS_1]: '初始',
  [TRACE_STATUS_2]: '已支付',
  [TRACE_STATUS_3]: '处理中',
  [TRACE_STATUS_4]: '待工单处理',
  [TRACE_STATUS_5]: '成功',
  [TRACE_STATUS_6]: '失败',
  [TRACE_STATUS_7]: '取消',
};

export const TRANSA_STATUS_1 = 1; // 初始
export const TRANSA_STATUS_2 = 2; // 待处理
export const TRANSA_STATUS_3 = 3; // 处理中
export const TRANSA_STATUS_4 = 4; // 成功
export const TRANSA_STATUS_5 = 5; // 失败

export const TransaStatus = {
  [TRANSA_STATUS_1]: '初始',
  [TRANSA_STATUS_2]: '待处理',
  [TRANSA_STATUS_3]: '处理中',
  [TRANSA_STATUS_4]: '成功',
  [TRANSA_STATUS_5]: '失败',
};

export const TRANSACTION_TYPE_1 = 1;
export const TRANSACTION_TYPE_2 = 2;

export const TransactionTypes = {
  [TRANSACTION_TYPE_1]: '批采',
  [TRANSACTION_TYPE_2]: '直充',
};

export const RECONCILIATION_STATUS_0 = 0;
export const RECONCILIATION_STATUS_1 = 1;
export const RECONCILIATION_STATUS_2 = 2;

// 对账状态
export const ReconStatus = {
  [RECONCILIATION_STATUS_0]: '待生成',
  [RECONCILIATION_STATUS_1]: '生成中',
  [RECONCILIATION_STATUS_2]: '已生成',
};

// 信息
export const ACCOUNT_INFO_1 = 1;
export const ACCOUNT_INFO_2 = 2;
export const ACCOUNT_INFO_3 = 3;

export const AccountInfo = {
  [ACCOUNT_INFO_1]: '管理员',
  [ACCOUNT_INFO_2]: '运营',
  [ACCOUNT_INFO_3]: '财务',
};

// 用户类型
export const USER_TYPE_0 = 0;
export const USER_TYPE_1 = 1;
export const USER_TYPE_2 = 2;
export const USER_TYPE_3 = 3;

export const UserTypes = {
  [USER_TYPE_0]: '未知',
  [USER_TYPE_1]: '个体工商户/个人',
  [USER_TYPE_2]: '企业',
  [USER_TYPE_3]: '政府',
};

// 商户资料
export const MERCHANT_STATUS_0 = 0; // 未认证
export const MERCHANT_STATUS_1 = 1; // 待审核
export const MERCHANT_STATUS_2 = 2; // 驳回
export const MERCHANT_STATUS_3 = 3; // 已认证

export const MerchantStatus = {
  [MERCHANT_STATUS_0]: '未认证',
  [MERCHANT_STATUS_1]: '待审核',
  [MERCHANT_STATUS_2]: '驳回',
  [MERCHANT_STATUS_3]: '已认证',
};

// 异常原因
export const JIEGUO_STATUS_0 = 0; // 开发者订单重复
export const JIEGUO_STATUS_1 = 1; // json解析失败
export const JIEGUO_STATUS_2 = 2; // 其他

export const JieGuoStatus = {
  [JIEGUO_STATUS_0]: '开发者订单重复',
  [JIEGUO_STATUS_1]: 'json解析失败',
  [JIEGUO_STATUS_2]: '其他',
};
export const CASH_FLOW_STATUS_1 = 1;
export const CASH_FLOW_STATUS_2 = 2;
export const CASH_FLOW_STATUS_3 = 3;

export const CashFlowStatus = {
  [CASH_FLOW_STATUS_1]: '处理中',
  [CASH_FLOW_STATUS_2]: '已完成',
  [CASH_FLOW_STATUS_3]: '已取消',
};

export const CASH_FLOW_BIZTYPE_1 = 1;
export const CASH_FLOW_BIZTYPE_2 = 2;

export const CashFlowBizTypes = {
  [CASH_FLOW_BIZTYPE_1]: '充值',
  [CASH_FLOW_BIZTYPE_2]: '提现',
};

export const FINANCIAL_FLOW_BIZTYPE_1 = 1;
export const FINANCIAL_FLOW_BIZTYPE_2 = 2;
export const FINANCIAL_FLOW_BIZTYPE_3 = 3;
export const FINANCIAL_FLOW_BIZTYPE_4 = 4;
export const FINANCIAL_FLOW_BIZTYPE_5 = 5;
export const FINANCIAL_FLOW_BIZTYPE_6 = 6;

export const financialFlowBizTypes = {
  [FINANCIAL_FLOW_BIZTYPE_1]: '充值',
  [FINANCIAL_FLOW_BIZTYPE_2]: '提现',
  [FINANCIAL_FLOW_BIZTYPE_3]: '采购',
  [FINANCIAL_FLOW_BIZTYPE_4]: '加款',
  [FINANCIAL_FLOW_BIZTYPE_5]: '减款',
  [FINANCIAL_FLOW_BIZTYPE_6]: '退款',
};

export const FINANCIAL_FLOW_BILLTYPE_1 = 1;
export const FINANCIAL_FLOW_BILLTYPE_2 = 2;

export const financialFlowBillTypes = {
  [FINANCIAL_FLOW_BILLTYPE_1]: '收入',
  [FINANCIAL_FLOW_BILLTYPE_2]: '支出',
};
