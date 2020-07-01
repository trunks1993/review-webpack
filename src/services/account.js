/*
 * @Date: 2020-06-30 11:25:08
 * @LastEditTime: 2020-06-30 19:59:35
 */

import request from "@/utils/request";

/**
 * @name: 登录
 * @param {data}
 */
export async function fakeAccountLogin(data) {
  return request("/user/login", {
    method: "POST",
    data,
  });
}

/**
 * @name: 获取用户信息
 * @param {type}
 */
export async function getUserInfo() {
  return request("/user/getUserInfo", {
    method: "POST",
  });
}
