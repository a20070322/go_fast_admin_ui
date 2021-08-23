/*
 * @Author: 赵忠洋
 * @Date: 2021-08-06 21:23:09
 * @LastEditTime: 2021-08-08 21:43:12
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/apis/admin_auth.ts
 */
import request from '@/utils/request'
/**登录接口-响应参数*/
export interface LoginRep {
  jwt_data: {
    token: string
    expires_at: number
  }
  user: {
    id: number
    created_at: string
    updated_at: string
    username: string
    avatar: string
    phone: string
    edges: {

    }
  }
}
/**登录接口-请求参数*/
export interface LoginReq {
  username: string
  password: string
}
/**登录接口*/
export async function login(data: LoginReq) {
  return request<RepCommon<LoginRep>>('/api/admin/auth/login', {
    method: 'POST',
    data: data
  })
}


/**刷新token-请求参数*/
export interface RefreshTokenReq {
  refresh_token: string
}
/**刷新token接口*/
export async function refresh_token(data: RefreshTokenReq) {
  return request<RepCommon<LoginRep>>('/api/admin/auth/refresh_token', {
    method: 'POST',
    data: data
  })
}


export interface MenuTree {
  id: number
  name: string
  key:number
  title:string
  path: string
  router_path: string
  icon: string|any
  type: "1"|"2"|"3"|"4"
  power_str: string
  fid: number
  is_external_link:boolean
  is_show: boolean
  is_enable: boolean
  created_at: string
  updated_at: string
  children: MenuTree[]
}

/**获取菜单及权限-响应参数*/
export interface OneselfMenusRep {
  menu: MenuTree[]
  role: string[]
}
/**获取菜单及权限*/
export async function oneselfMenus() {
  return request<RepCommon<OneselfMenusRep>>('/api/admin/common/oneself_menus', {
    method: 'GET',

  })
}


