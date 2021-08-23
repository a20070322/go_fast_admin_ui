/*
 * @Author: 赵忠洋
 * @Date: 2021-08-17 17:23:11
 * @LastEditTime: 2021-08-17 17:24:37
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/menu/components/utils.tsx
 */
import { MenuTreeListItem } from "@/apis/admin_menu"
import { TreeNode } from "antd/lib/tree-select"

export const renderTreeNode = (menus: MenuTreeListItem[]) => {
  return menus.map(item => {
    if (item.type == 3 || item.type == 4) {
      return undefined
    }
    return (
      <TreeNode key={item.id} value={item.id} data-item={item} title={item.name}>
        {
          item.children && renderTreeNode(item.children)
        }
      </TreeNode>
    )
  })
}

export const findItem = (menus: MenuTreeListItem[], fid: number) => {
  let active: MenuTreeListItem | undefined
  const fn = (menus: MenuTreeListItem[], f_id: number) => {
    for (let item of menus) {
      if (item.id === f_id) {
        active = item
        break
      } else {
        item.children && fn(item.children, f_id)
      }
    }
  }
  fn(menus, fid)
  return active
}
export const optionsData = [
  {
    label: '目录',
    value: 1,
  },
  {
    label: '菜单',
    value: 2,
  },
  {
    label: '按钮',
    value: 3,
  },
  {
    label: '数据',
    value: 4,
  },
]
