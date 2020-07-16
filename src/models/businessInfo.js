/*
 * @Author: Dad
 * @Date: 2020-07-15 09:37:47
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-15 09:41:27
 */
import { } from '@/services/businessInfo';
import produce from 'immer';

export default {
  namespace: 'businessInfo',

  state: {
    list: [],
    total: 0,
  },

  effects: {
    /** */
    * fetchActList({ queryParams }, { call, put }) {
      const [err, data, msg] = yield call(queryList, queryParams);
      if (!err){
        yield put({
          type: 'setList',
          payload: data,
        });
      }

    },
  },

  reducers: {
    /** */
    setList: produce((draft, { payload }) => {
      draft.list = payload.list;
      draft.total = payload.totalRecords;
    }),
  },
};
