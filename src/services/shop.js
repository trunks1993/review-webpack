/*
 * @Date: 2020-07-04 09:49:04
 * @LastEditTime: 2020-07-14 16:39:21
 */
import request from "@/utils/request";

// 获取类别 /search/searchBrandList
/**
 * @name: 获取类别
 * @param {}
 */
export async function getCategoryList() {
  return request("/search/searchCategoryList", {
    method: "POST",
    data: {
      currPage: 1,
      level: 1,
      pageSize: 100,
    },
  });
}

export async function getProductTypeList() {
  return request("/search/loadProductTypeList", {
    method: "POST",
  });
}

export async function getBrandList(data) {
  return request("/search/searchBrandList", {
    method: "POST",
    data,
  });
}

export async function getProductMap(data) {
  return request("/search/searchProductMap", {
    method: "POST",
    data,
  });
}

export async function getPurchaseOrder(data) {
  return request("/order/searchOrderList", {
    method: "POST",
    data,
  });
}

export async function cancelOrder(orderId) {
  return request("/order/cancelOrder", {
    method: "POST",
    data: {
      orderId,
    },
  });
}

export async function queryListTrace(data) {
  return request("/order/searchOrderChargeTraceList", {
    method: "POST",
    data,
  });
}
