/*
 * @Dictor: 赵忠洋
 * @Date: 2021-08-19 16:09:51
 * @LastEditTime: 2021-08-19 16:14:17
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/models/dict.ts
 */
import { Effect, ImmerReducer } from "@/.umi/plugin-dva/connect";
import { dictMapCatch, DictMapCatchRep } from "@/apis/admin_dict";
export type DictModelState = {
  dictMap: DictMapCatchRep
}
export interface DictModelType {
  namespace: 'dict';
  state: DictModelState;
  effects: {
    getDictCatch: Effect;
  };
  reducers: {
    setDict: ImmerReducer<DictModelState>;
  };
}

const DictModel: DictModelType = {
  namespace: "dict",
  state: {
    dictMap: {}
  },
  effects: {
    *getDictCatch(_, { call, put }) {
      // 获取菜单及权限
      const { data }: RepCommon<DictMapCatchRep> = yield call(dictMapCatch)
      yield put({
        type: 'setDict',
        payload: data
      })
    }
  },
  reducers: {
    setDict(state, { payload }) {
      state.dictMap = payload
    }
  }
}
export default DictModel;
