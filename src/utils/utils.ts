/*
 * @Author: 赵忠洋
 * @Date: 2021-08-08 22:21:18
 * @LastEditTime: 2021-08-17 09:02:51
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/utils/utils.ts
 */

export const menuTypeMapData = {
  "1":{
    color:"#52c41a",
    icon:"FolderOpenOutlined",
    title:"目录"
  },
  "2":{
    color:"#1890ff",
    icon:"MenuOutlined",
    title:"菜单"
  },
  "3":{
    color:"#fa8c16",
    icon:"LinkOutlined",
    title:"按钮"
  },
  "4":{
    color:"#eb2f96",
    icon:"DatabaseOutlined",
    title:"数据"
  },
}

export function isValidKey(key: string | number | symbol , object: object): key is keyof typeof object {
  return key in object;
}
