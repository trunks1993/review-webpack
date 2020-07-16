/*
 * @Date: 2020-07-14 20:43:35
 * @LastEditTime: 2020-07-16 17:11:22
 */

import request from "@/utils/request";

/**
 * @name: 获取订单详情
 * @param {}
 */
export async function getOrderInfo(orderId) {
  return request("/order/getOrderInfo", {
    method: "POST",
    data: {
      orderId,
    },
  });
}

export async function sendAuthCode(telephone) {
  return request("/order/sendPayValidateCode", {
    method: "POST",
    data: {
      telephone,
    },
  });
}

export async function pay(data) {
  return request("/order/pay", {
    method: "POST",
    data,
  });
}
