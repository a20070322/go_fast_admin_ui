/** 角色 */
import request from "@/utils/request";

/**角色创建角色-响应参数*/
export interface RoleCreateRep {
  id: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
  phone: string
  edges: {
  }
}
/**角色创建角色-请求参数*/
export interface RoleCreateReq {
  name: string
  is_enable: boolean
}
/**角色创建角色*/
export async function roleCreate(data: RoleCreateReq) {
  return request<RepCommon<RoleCreateRep>>('/api/admin/admin_role/create', {
    method: 'POST',
    data: data
  })
}

/**角色更新角色-响应参数*/
export interface RoleUpdateRep {
  id: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
  phone: string
  edges: {
  }
}
/**角色更新角色-请求参数*/
export interface RoleUpdateReq {
  id: number
  name: string
  is_enable: boolean
}
/**角色更新角色*/
export async function roleUpdate(data: RoleUpdateReq) {
  return request<RepCommon<RoleUpdateRep>>(`/api/admin/admin_role/update/${data.id}`, {
    method: 'POST',
    data: data
  })
}
export interface RoleListReq extends PageType {
  name?: string
  is_enable?: string
  is_all?: string
}
export interface RoleListItem {
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
}


/**角色列表角色-响应参数*/
export interface RoleListRep {
  data: RoleListItem[]
  total: number
}
/**角色列表角色*/
export async function roleList(data: RoleListReq) {
  return request<RepCommon<RoleListRep>>('/api/admin/admin_role/list', {
    method: 'GET',
    params: data
  })
}

/**角色删除角色-响应参数*/
export interface RoleDeleteRep {
  id: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
  phone: string
  edges: {
  }
}
/**角色删除角色-请求参数*/
export interface RoleDeleteReq {
  id: number
}
/**角色删除角色*/
export async function roleDelete(data: RoleDeleteReq) {
  return request<RepCommon<RoleDeleteRep>>(`/api/admin/admin_role/delete/${data.id}`, {
    method: 'POST',
    data: data
  })
}

/**角色获取角色菜单-响应参数*/
export interface RoleFindMenusRep {
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
  path: string
  router_path: string
  power_str: string
  fid: number
}
/**角色获取角色菜单-请求参数*/
export interface RoleFindMenusReq {
  id: number
}
/**角色获取角色菜单*/
export async function roleFindMenus(data: RoleFindMenusReq) {
  return request<RepCommon<RoleFindMenusRep>>(`/api/admin/admin_role/find_menus/${data.id}`, {
    method: 'GET',
    params: data
  })
}

/**角色更新角色权限-响应参数*/
export interface RoleMenuUpdateRep {
  id: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
  phone: string
  edges: {
  }
}
/**角色更新角色权限-请求参数*/
export interface RoleMenuUpdateReq {
  id: number
  menus: number[]
}
/**角色更新角色权限*/
export async function roleMenuUpdate(data: RoleMenuUpdateReq) {
  return request<RepCommon<RoleMenuUpdateRep>>(`/api/admin/admin_role/menu_update/${data.id}`, {
    method: 'POST',
    data: data
  })
}
