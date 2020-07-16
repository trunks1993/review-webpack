/*
 * @Date: 2020-06-20 17:29:14
 * @LastEditTime: 2020-07-14 21:27:23
 */

import Cookies from 'js-cookie';

const TokenKey = 'USERTOKEN';

export const getToken = () => Cookies.get(TokenKey);

export const setToken = (token) => Cookies.set(TokenKey, token);

export const removeToken = () => Cookies.remove(TokenKey);

const StepKey = 'STEPTOKEN';

export const getStepCookie = () => Cookies.get(StepKey);

export const setStepCookie = (step) => Cookies.set(StepKey, step);

export const removeStepCookie = () => Cookies.remove(StepKey);
