/*
 * @Author: 赵忠洋
 * @Date: 2021-08-16 16:52:55
 * @LastEditTime: 2021-08-17 17:50:17
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/menu/MenuList.tsx
 */
import { useRequest } from '@/.umi/plugin-request/request'
import { menuDelete, menuTreeList, MenuTreeListItem } from '@/apis/admin_menu'
import AdminTable from '@/components/admin-table/AdminTable'
import DeleteButton from '@/components/admin-table/DeleteButton'
import AuthShow from '@/components/auth-show/AuthShow'
import IconShow from '@/components/icon-show/IconShow'
import { isValidKey, menuTypeMapData } from '@/utils/utils'
import { Button, Space, Switch, Tag } from 'antd'
import React from 'react'
import MenuFormAdd from './components/MenuFormAdd'
import MenuFormUpdate from './components/MenuFormUpdate'

interface Props {

}

const MenuList = (props: Props) => {
  // 全部权限获取
  let menuReq = useRequest<RepCommon<MenuTreeListItem[]>>(menuTreeList, {})
  return (
    <AdminTable<MenuTreeListItem>
      // refresh={table.refresh}
      refresh={menuReq.refresh}
      rowKey="id"
      cardConfig={{
        title: "菜单列表",
      }}
      loading={menuReq.loading}
      pagination={false}
      scroll={{
        x: 'true',
        scrollToFirstRowOnChange: true
      }}
      dataSource={menuReq.data || []}
      toolsRender={[
        <AuthShow authKey="admin:menu:create" key="UserFormAdd">
          <MenuFormAdd onSuccess={menuReq.refresh}>
            <Button type="primary" size="middle">新增菜单</Button>
          </MenuFormAdd>
        </AuthShow>
      ]}
      columns={[
        {
          "title": "类型",
          "dataIndex": "type",
          "key": "type",
          // align: 'center',
          "width": 160,
          "ellipsis": true,
          render(val: "1" | "2" | "3" | "4") {
            if (val) {
              let tag = menuTypeMapData[val]
              return <Tag color={tag.color} icon={<IconShow iconType={tag.icon} size={12} />}>{tag.title}</Tag>
            }
            return "-"
          }
        },
        {
          "title": "菜单名称",
          "dataIndex": "name",
          "key": "name",
          // align: 'center',
          "width": 170,
          "ellipsis": true
        },
        {
          "title": "权限标识",
          "dataIndex": "power_str",
          "key": "power_str",
          // align: 'center',
          "width": 200,
          "ellipsis": true
        },
        {
          "title": "MenuIcon",
          "dataIndex": "icon",
          "key": "icon",
          align: 'center',
          "width": 100,
          "ellipsis": true,
          render(val) {
            return val && <IconShow iconType={val} color="#333" />
          }
        },
        {
          "title": "排序",
          "dataIndex": "sort",
          "key": "sort",
          "width": 100,
          "ellipsis": true,
          render: (val) => val === undefined ? "0" : val
        },
        {
          "title": "是否禁用",
          "dataIndex": "is_enable",
          "key": "is_enable",
          "width": 100,
          "ellipsis": true,
          render(val) {
            return <Switch disabled checked={val}></Switch>
          }
        },
        {
          "title": "操作",
          "width": 260,
          align: "center",
          fixed: 'right',
          render: (_, row) => {
            return (
              <Space>
                {
                  [1, 2].includes(row.type) && (
                    <AuthShow authKey="admin:menu:create" key="UserFormAdd">
                      <MenuFormAdd onSuccess={menuReq.refresh} fid={row.id}>
                        <Button type="link">新增菜单</Button>
                      </MenuFormAdd>
                    </AuthShow>
                  )
                }
                <AuthShow authKey="admin:menu:update">
                  <MenuFormUpdate itemData={row} onSuccess={menuReq.refresh}>
                    <Button type="link">修改</Button>
                  </MenuFormUpdate>
                </AuthShow>
                <AuthShow authKey="admin:menu:delete">
                  <DeleteButton upDateFn={menuDelete} payload={{ id: row.id }} onSuccess={menuReq.refresh}></DeleteButton>
                </AuthShow>
              </Space>
            )
          }
        }
      ]}
    >
    </AdminTable>
  )
}

export default MenuList
