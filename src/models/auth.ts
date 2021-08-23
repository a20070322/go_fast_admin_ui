/*
 * @Author: 赵忠洋
 * @Date: 2021-08-08 21:18:51
 * @LastEditTime: 2021-08-11 09:57:28
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/models/auth.ts
 */

import { Effect, ImmerReducer } from "@/.umi/plugin-dva/connect";
import { oneselfMenus, OneselfMenusRep } from "@/apis/admin_auth";
export type AuthModelState = OneselfMenusRep
export interface AuthModelType {
  namespace: 'auth';
  state: AuthModelState;
  effects: {
    gerOneselfMenus: Effect;
  };
  reducers: {
    setAuth: ImmerReducer<AuthModelState>;
  };
}

const AuthModel: AuthModelType = {
  namespace:"auth",
  state:{
    menu:[],
    role:[]
  },
  effects:{
    *gerOneselfMenus(_, { call, put }){
      // 获取菜单及权限
      const {data} :RepCommon<OneselfMenusRep> = yield call(oneselfMenus)
      yield put({
        type: 'setAuth',
        payload: data
      })
    }
  },
  reducers:{
    setAuth(state, { payload }){
      state.menu = payload.menu
      state.role = payload.role
    }
  }
}
export default AuthModel;
