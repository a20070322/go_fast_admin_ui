/*
 * @Author: 赵忠洋
 * @Date: 2020-12-14 12:16:11
 * @LastEditTime: 2021-08-07 23:33:13
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/models/user.ts
 */
import { Effect, ImmerReducer } from 'umi';
// import { getUser } from '@/services/user'
export interface UserType {
  avatar?: string
  created_at: string
  id: number
  is_enable: boolean
  phone: string
  username: string
  edges: {
    id: number
    name: string
    is_enable: boolean
  }[]
}
export interface JwtDataType {
  token?: string
  expires_at?: number
  refresh_token?: string
  refresh_expires_at?: number
}
export interface UserModelState {
  user: UserType
  jwt_data: JwtDataType
}
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getuser: Effect;
  };
  reducers: {
    setUser: ImmerReducer<UserModelState>;
    updateUser: ImmerReducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    user: JSON.parse(window.localStorage.getItem('userInfo') || '{}'),
    jwt_data: JSON.parse(window.localStorage.getItem('jwtData') || '{}')
  },
  effects: {
    *getuser() { }
    // *getuser(_action, { call, put }) {
    //   const { data } = yield call(getUser)
    //   yield put({
    //     type: 'updateUser',
    //     payload: {
    //       ...data,
    //       avatarUrl: IMG_URL + data.avatar,
    //     }
    //   })
    // },
  },
  reducers: {
    setUser(state, { payload }) {
      window.localStorage.setItem('userInfo', JSON.stringify(payload.user || ""))
      state.user = payload.user

      window.localStorage.setItem('jwtData', JSON.stringify(payload.jwt_data || ""))
      state.jwt_data = payload.jwt_data
    },
    updateUser(state, { payload }) {
      const updateUserData = {
        ...state.user,
        ...payload
      }
      window.localStorage.setItem('userInfo', JSON.stringify(updateUserData))
      state.user = updateUserData
    },
  }
};
export default UserModel;
