/** 菜单 */
import request from "@/utils/request";

/**菜单列表菜单-响应参数*/
export interface MenuListRep {
  data: {
    id: number
    created_at: string
    updated_at: string
    name: string
    icon: string
    type: number
    is_show: boolean
    is_enable: boolean
    edges: {
    }
  }[]
  total: number
}
/**菜单列表菜单*/
export async function menuList() {
  return request<RepCommon<MenuListRep>>('/api/admin/admin_menus/list', {
    method: 'GET',

  })
}

/**菜单创建菜单-响应参数*/
export interface MenuCreateRep {
  id: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
  phone: string
  edges: {
  }
}
/**菜单创建菜单-请求参数*/
export interface MenuCreateReq {
  // 请求路径
  path: string
  // 请求方法
  path_action: string
  // icon图标
  icon: string
  // 菜单类型
  type: string
  // 权限标识
  power_str: string
  // 排序字段
  sort: number
  // 父级id
  fid: number
  // 是否外链
  is_external_link: boolean
  // 是否展示
  is_show: boolean
  // 是否启用
  is_enable: boolean
  // 菜单名称
  name: string
  // 页面路径
  router_path: string
}
/**菜单创建菜单*/
export async function menuCreate(data: MenuCreateReq) {
  return request<RepCommon<MenuCreateRep>>('/api/admin/admin_menus/create', {
    method: 'POST',
    data: data
  })
}

/**菜单更新菜单-响应参数*/
export interface MenuUpdateRep {
  id: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
  phone: string
  edges: {
  }
}
/**菜单更新菜单-请求参数*/
export interface MenuUpdateReq {
  id: number
  path: string
  icon: string
  type: string
  power_str: string
  sort: number
  fid: number
  is_external_link: boolean
  is_show: boolean
  is_enable: boolean
  name: string
}
/**菜单更新菜单*/
export async function menuUpdate(data: MenuUpdateReq) {
  return request<RepCommon<MenuUpdateRep>>(`/api/admin/admin_menus/update/${data.id}`, {
    method: 'POST',
    data: data
  })
}

/**菜单删除菜单-响应参数*/
export interface MenuDeleteRep {
  id: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
  phone: string
  edges: {
  }
}
/**菜单删除菜单-请求参数*/
export interface MenuDeleteReq {
  id: number
}
/**菜单删除菜单*/
export async function menuDelete(data: MenuDeleteReq) {
  return request<RepCommon<MenuDeleteRep>>(`/api/admin/admin_menus/delete/${data.id}`, {
    method: 'POST',
    data: data
  })
}

/**菜单列表菜单(tree)-响应参数*/
export interface MenuTreeListItem {
  id: number
  name: string
  key: number
  title: string
  path: string
  router_path: string
  icon: string | any
  type: 1 | 2 | 3 | 4
  path_action: string
  power_str: string
  fid: number
  is_external_link: boolean
  is_show: boolean
  is_enable: boolean
  created_at: string
  updated_at: string
  children: MenuTreeListItem[]
}
/**菜单列表菜单(tree)*/
export async function menuTreeList() {
  return request<RepCommon<MenuTreeListItem[]>>('/api/admin/admin_menus/tree_list', {
    method: 'GET',

  })
}
