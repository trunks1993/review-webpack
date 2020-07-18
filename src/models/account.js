/*
 * @Date: 2020-06-28 16:36:16
 * @LastEditTime: 2020-07-16 21:14:51
 */
import produce from 'immer';
import md5 from 'js-md5';
import { setToken } from '@/utils/auth';
import { getQueryVariable } from '@/utils';
import { fakeAccountLogin, getUserInfo, getAccountInfo, getCarData } from '@/services/account';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

// import { createHashHistory } from 'history';
// const history = createHashHistory();

export default {
  namespace: 'account',
  state: {
    user: {},
    amountInfo: {},
    carData: {},
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      payload.password && (payload.password = md5(payload.password));
      try {
        const [err, data, msg] = yield call(fakeAccountLogin, payload);
        if (!err) {
          setToken(data.token);
          const redirect = decodeURIComponent(getQueryVariable('redirect'));
          if (redirect) {
            // history.push(redirect);
            yield put(routerRedux.push(redirect));
          } else {
            // window.location.href = '/';
            yield put(routerRedux.push('/'));
          }
        } else message.error(msg);
      } catch (error) {}
    },
    *setUser({}, { call, put }) {
      try {
        const [err, data, msg] = yield call(getUserInfo);
        if (!err) {
          yield put({
            type: '_setUser',
            payload: data,
          });
        } else message.error(msg);
      } catch (error) {}
    },
    *setAmount({}, { call, put }) {
      try {
        const [err, data, msg] = yield call(getAccountInfo);
        if (!err) {
          yield put({
            type: '_setAmount',
            payload: data,
          });
        } else message.error(msg);
      } catch (error) {}
    },
    *setCarData({}, { call, put }) {
      try {
        const [err, data, msg] = yield call(getCarData);
        if (!err) {
          yield put({
            type: '_setCarData',
            payload: data,
          });
        } else message.error(msg);
      } catch (error) {}
    },
    *setSignUpVisible(_, { put }) {
      yield put({
        type: '_setSignUpVisible',
      });
    },
    *logout(_, { put }) {
      removeToken();
      window.location.href = '/';
    },
  },

  reducers: {
    _setSignUpVisible: produce((draft) => {
      draft.signUpVisible = !draft.signUpVisible;
    }),
    _setUser: produce((draft, { payload }) => {
      draft.user = payload;
    }),
    _setAmount: produce((draft, { payload }) => {
      draft.amountInfo = payload;
    }),
    _setCarData: produce((draft, { payload }) => {
      draft.carData = payload;
    }),
  },
};
