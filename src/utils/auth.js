/*
 * @Date: 2020-06-20 17:29:14
 * @LastEditTime: 2020-06-30 14:27:53
 */

import Cookies from "js-cookie";

const TokenKey = "USERTOKEN";

export const getToken = () => Cookies.get(TokenKey);

export const setToken = (token) => Cookies.set(TokenKey, token);

export const removeToken = () => Cookies.remove(TokenKey);
