/*
 * @Date: 2020-06-28 16:36:16
 * @LastEditTime: 2020-07-02 11:42:16
 */
import produce from 'immer';
import md5 from 'js-md5';
import { setToken } from '@/utils/auth';
import { getQueryVariable } from '@/utils';
import { fakeAccountLogin, getUserInfo } from '@/services/account';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

// import { createHashHistory } from 'history';
// const history = createHashHistory();

export default {
  namespace: 'account',
  state: {
    user: {},
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
  },
};
