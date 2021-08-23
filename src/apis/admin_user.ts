/*
 * @Author: 赵忠洋
 * @Date: 2021-08-09 15:20:08
 * @LastEditTime: 2021-08-13 10:24:14
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/apis/admin_user.ts
 */
/** 用户 */
import request from "@/utils/request";

/**用户创建用户-响应参数*/
export interface UserCreateRep {
  id: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
  phone: string
  edges: {
  }
}
/**用户创建用户-请求参数*/
export interface UserCreateReq {
  username: string
  password: string
  avatar: string
  phone: string
  is_enable: boolean
}
/**用户创建用户*/
export async function userCreate(data: UserCreateReq) {
  return request<RepCommon<UserCreateRep>>('/api/admin/user/create', {
    method: 'POST',
    data: data
  })
}

/**用户更新用户-响应参数*/
export interface UserUpdateRep { }
/**用户更新用户-请求参数*/
export interface UserUpdateReq {
  username: string
  avatar: string
  phone: string
  is_enable: boolean
  id: string
}
/**用户更新用户*/
export async function userUpdate(data: UserUpdateReq) {
  return request<RepCommon<UserUpdateRep>>(`/api/admin/user/update/${data.id}`, {
    method: 'POST',
    data: data
  })
}

/**用户删除用户-响应参数*/
export interface UserDeleteRep { }
/**用户删除用户-请求参数*/
export interface UserDeleteReq {
  id: string
}
/**用户删除用户*/
export async function userDelete(data: UserDeleteReq) {
  return request<RepCommon<UserDeleteRep>>(`/api/admin/user/delete/${data.id}`, {
    method: 'POST',
    data: data
  })
}

/**用户列表用户-请求参数*/
export interface UserListReq extends PageType {
  username?: string
  phone?: string
  is_enable?: string
  role?: number
}

export interface UserListItem {
  id: string
  created_at: string
  updated_at: string
  username: string
  phone: string
  edges: {
    role: {
      id: number
      created_at: string
      updated_at: string
      name: string
      edges: {
      }
    }[]
  }
}
/**用户列表用户-响应参数*/
export interface UserListRep {
  data: UserListItem[]
  total: number
}
/**用户列表用户*/
export async function userList(data: UserListReq) {
  return request<RepCommon<UserListRep>>('/api/admin/user/list', {
    method: 'GET',
    params: data
  })
}
