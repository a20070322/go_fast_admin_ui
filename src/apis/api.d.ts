/*
 * @Author: 赵忠洋
 * @Date: 2021-08-06 21:18:20
 * @LastEditTime: 2021-08-06 21:18:45
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/apis/api.d.ts
 */

declare interface RepCommon<T = any> {
  result: any;
  code: number,
  msg: string
  data: T
}


declare interface PageType {
  page?: number
  size?: number
  // [key: string]: any
}

declare interface PageRes<T> {
  data: T[]
  total: number
}
