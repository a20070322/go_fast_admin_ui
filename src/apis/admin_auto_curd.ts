/*
 * @Author: 赵忠洋
 * @Date: 2021-08-20 12:13:00
 * @LastEditTime: 2021-08-20 19:20:32
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/apis/admin_auto_curd.ts
 */
import request from "@/utils/request";


/**字典创建-响应参数*/
export interface AutoCurdDefaultConfigRep {
  work_path: string
  model_name: string
}
/**字典创建-请求参数*/
export interface AutoCurdDefaultConfigReq {

}

/**字典创建*/
export async function autoCurdDefaultConfig() {
  return request<RepCommon<AutoCurdDefaultConfigRep>>('/api/admin/admin_auto_curd/default_config', {
    method: 'GET',
  })
}


export interface FieldsType {
  id: number
  // "UUID"|
  field_type: "Int" | "Int8" | "Int16" | "Int32" | "Int64" | "Float" | "Float32" | "String" | "Text" | "Bytes" | "Bool" | "Time" | "JSON" | "UUID"
  // 字段名称
  field_name: string
  // 字段描述
  field_comment: string
  // 字段默认值
  field_default: string
  // 是否为敏感字段
  is_sensitive: boolean
  // 是否可以为空
  is_optional: boolean
  // 是否唯一
  is_unique: boolean
  // 是否存在于插入表单
  is_insert: boolean
  // 是否存在于编辑表单
  is_edit: boolean
  // 是否列表展示字段
  is_list_show: boolean
  // 是否列表默认展示字段
  is_list_default_show: boolean
  // 是否为搜索字段
  is_search: boolean
  // 查询方式
  search_type: "1" | "2" | "3" | "4" | "5" | "6" | ""
  // 展示方式
  show_type: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  // 展示配置说明
  show_config: any
  // 字典类型
  dict_type: string
}
