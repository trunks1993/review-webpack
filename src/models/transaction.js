/*
 * @Author: Dad
 * @Date: 2020-07-13 15:24:54
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-13 19:47:16
 */
import { queryList, queryReconList } from '@/services/transaction';
import produce from 'immer';

export default {
  namespace: 'transaction',

  state: {
    list: [],
    total: 0,
  },

  effects: {
    /** */
    * fetchList({ queryParams }, { call, put }) {
      const [err, data, msg] = yield call(queryList, queryParams);
      if (!err){
        yield put({
          type: 'setList',
          payload: data,
        });
      }

    },
    * fetchReconList({ queryParams }, { call, put }) {
      const [err, data, msg] = yield call(queryReconList, queryParams);
      if (!err){
        yield put({
          type: 'setReconList',
          payload: data,
        });
      }
    }
  },

  reducers: {
    /** */
    setList: produce((draft, { payload }) => {
      draft.list = payload.list;
      draft.total = payload.totalRecords;
    }),
    /** */
    setReconList: produce((draft, { payload }) => {
      draft.reconList = payload.list;
      draft.reconTotal = payload.totalRecords;
    }),
  },
};
