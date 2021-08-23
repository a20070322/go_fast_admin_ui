/*
 * @Author: 赵忠洋
 * @Date: 2021-08-18 14:38:48
 * @LastEditTime: 2021-08-19 18:28:07
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/apis/admin_dict.ts
 */
import request from "@/utils/request";

/**字典列表-请求参数*/
export interface DictListReq extends PageType {
  dict_type?: string
  dict_name?: string
  is_enable?: string
}

// 字典列表 字段值
export interface DictListItem {
  id: number
  created_at: string
  updated_at: string
  dict_type: string
  dict_name: string
  remarks: string
  is_enable: boolean

}
/**字典列表-响应参数*/
export interface DictListRep {
  data: DictListItem[]
  total: number
}
/**字典列表*/
export async function dictList(data: DictListReq) {
  return request<RepCommon<DictListRep>>('/api/admin/admin_dict/list', {
    method: 'GET',
    params: data
  })
}


/**字典创建-响应参数*/
export interface DictCreateRep {

}
/**字典创建-请求参数*/
export interface DictCreateReq {
  dict_type: string
  dict_name: string
  remarks: string
  is_enable: boolean
}

/**字典创建*/
export async function dictCreate(data: DictCreateReq) {
  return request<RepCommon<DictCreateRep>>('/api/admin/admin_dict/create', {
    method: 'POST',
    data: data
  })
}

/**字典创建-响应参数*/
export interface DictUpdateRep {

}
/**字典创建-请求参数*/
export interface DictUpdateReq {
  id: number
  dict_type: string
  dict_name: string
  remarks: string
  is_enable: boolean
}

/**字典创建*/
export async function dictUpdate(data: DictUpdateReq) {
  return request<RepCommon<DictUpdateRep>>(`/api/admin/admin_dict/update/${data.id}`, {
    method: 'POST',
    data: data
  })
}



/**字典删除-响应参数*/
export interface DictDeleteRep {

}
/**字典删除-请求参数*/
export interface DictDeleteReq {
  id: number
  dict_type: string
  dict_name: string
  remarks: string
  is_enable: boolean
}

/**字典删除*/
export async function dictDelete(data: DictDeleteReq) {
  return request<RepCommon<DictDeleteRep>>(`/api/admin/admin_dict/delete/${data.id}`, {
    method: 'POST',
    data: data
  })
}




/**字典列表-请求参数*/
export interface DictKeyListReq extends PageType {
  fid?: number
}

// 字典列表 字段值
export interface DictKeyListItem {
  edges: {
    P: {
      id: number
    }
  };
  id: string
  created_at: string
  updated_at: string
  dict_label: string
  dict_code: string
  sort: number
  remarks: string
  is_enable: boolean

}
/**字典列表-响应参数*/
export interface DictKeyListRep {
  data: DictKeyListItem[]
  total: number
}
/**字典列表*/
export async function dictKeyList(data: DictKeyListReq) {
  return request<RepCommon<DictKeyListRep>>('/api/admin/admin_dict_key/list', {
    method: 'GET',
    params: data
  })
}


/**字典创建-响应参数*/
export interface DictKeyCreateRep {

}
/**字典创建-请求参数*/
export interface DictKeyCreateReq {
  fid: number
  dict_label: string
  dict_code: string
  sort: number
  remarks: string
  is_enable: boolean
}

/**字典创建*/
export async function dictKeyCreate(data: DictKeyCreateReq) {
  return request<RepCommon<DictKeyCreateRep>>('/api/admin/admin_dict_key/create', {
    method: 'POST',
    data: data
  })
}

/**字典创建-响应参数*/
export interface DictKeyUpdateRep {

}
/**字典创建-请求参数*/
export interface DictKeyUpdateReq {
  id: number
  fid: number
  dict_label: string
  dict_code: string
  sort: number
  remarks: string
  is_enable: boolean
}

/**字典创建*/
export async function dictKeyUpdate(data: DictKeyUpdateReq) {
  return request<RepCommon<DictKeyUpdateRep>>(`/api/admin/admin_dict_key/update/${data.id}`, {
    method: 'POST',
    data: data
  })
}



/**字典删除-响应参数*/
export interface DictKeyDeleteRep {

}
/**字典删除-请求参数*/
export interface DictKeyDeleteReq {
  id: number
}

/**字典删除*/
export async function dictKeyDelete(data: DictKeyDeleteReq) {
  return request<RepCommon<DictKeyDeleteRep>>(`/api/admin/admin_dict_key/delete/${data.id}`, {
    method: 'POST',
  })
}


/**字典获取-响应参数*/
export interface DictMapCatchRep {
  [key: string]: {
    label: string
    value: string
  }[]
}
/**字典获取*/
export async function dictMapCatch() {
  return request<RepCommon<DictMapCatchRep>>("/api/admin/admin_dict/dict_map", {
    method: 'GET',
  })
}


/**字典缓存清除-响应参数*/
export interface DictRefreshCatchRep {

}
/**字典缓存清除*/
export async function dictRefresh() {
  return request<RepCommon<DictRefreshCatchRep>>("/api/admin/admin_dict/refresh_dict_map", {
    method: 'POST',
  })
}
