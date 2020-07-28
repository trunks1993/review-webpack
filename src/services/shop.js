/*
 * @Date: 2020-07-04 09:49:04
 * @LastEditTime: 2020-07-28 15:26:12
 */
import request from '@/utils/request';

// 获取类别 /search/searchBrandList
/**
 * @name: 获取类别
 * @param {}
 */
export async function getCategoryList() {
  return request('/search/searchCategoryList', {
    method: 'POST',
    data: {
      currPage: 1,
      level: 1,
      pageSize: 100,
    },
  });
}

export async function getProductTypeList() {
  return request('/search/loadProductTypeList', {
    method: 'POST',
  });
}

export async function getBrandList(data) {
  return request('/search/searchBrandList', {
    method: 'POST',
    data,
  });
}

export async function getProductMap(data) {
  return request('/search/searchProductMap', {
    method: 'POST',
    data,
  });
}

export async function getPurchaseOrder(data) {
  return request('/order/searchOrderList', {
    method: 'POST',
    data,
  });
}

export async function cancelOrder(orderId) {
  return request('/order/cancelOrder', {
    method: 'POST',
    data: {
      orderId,
    },
  });
}

export async function queryListTrace(data) {
  return request('/order/searchOrderChargeTraceList', {
    method: 'POST',
    data,
  });
}

export async function getGoodsInfo(data) {
  return request('/search/getGoods', {
    method: 'POST',
    data,
  });
}

export async function getGoodsSku(productCode) {
  return request('/search/searchProductSubList', {
    method: 'POST',
    data: { productCode },
  });
}

export async function submitOrder(data) {
  return request('/cart/buyImmediately', {
    method: 'POST',
    data,
  });
}

export async function addToCart(data) {
  return request('/cart/addToCart', {
    method: 'POST',
    data,
  });
}

export async function removeCarItem(itemCode) {
  return request('/cart/deleteCartItem', {
    method: 'POST',
    data: {
      itemCode,
    },
  });
}

export async function updateCarItem(data) {
  return request('/cart/updateCartItem', {
    method: 'POST',
    data,
  });
}

export async function checkedAll(checked) {
  return request('/cart/checkedAll', {
    method: 'POST',
    data: {
      checked,
    },
  });
}

export async function removeAll() {
  return request('/cart/batchDeleteCartItem', {
    method: 'POST',
  });
}

export async function getCartDetail(itemCode) {
  return request('/cart/loadCartDetailList', {
    method: 'POST',
    data: {
      itemCode,
    },
  });
}

export async function addOrder() {
  return request('/order/addOrder', {
    method: 'POST',
  });
}

export async function rebuy(data) {
  return request('/order/rebuy', {
    method: 'POST',
    data,
  });
}
