/*
 * @Author: 赵忠洋
 * @Date: 2021-08-13 14:39:38
 * @LastEditTime: 2021-08-14 11:29:40
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/role/RoleList.tsx
 */
import { roleDelete, roleList, RoleListItem, RoleListRep, RoleListReq } from '@/apis/admin_role'
import AdminTable from '@/components/admin-table/AdminTable'
import DeleteButton from '@/components/admin-table/DeleteButton'
import AuthShow from '@/components/auth-show/AuthShow'
import ToolsTime from '@/components/tools/ToolsTime'
import { useTable } from '@/hooks/useTable'
import { Button, Space, Switch } from 'antd'
import React from 'react'
import AssignMenu from './components/AssignMenu'
import RoleFormAdd from './components/RoleFormAdd'
import RoleFormSearch from './components/RoleFormSearch'
import RoleFormUpdate from './components/RoleFormUpdate'

interface Props {

}

const RoleList = (props: Props) => {
  let table = useTable<RepCommon<RoleListRep>, RoleListReq, RoleListItem>({
    service: roleList
  })
  return (
    <AdminTable
      refresh={table.refresh}
      header={<RoleFormSearch {...table.formSearchConfig}></RoleFormSearch>}
      rowKey="id"
      {
      ...table.tableConfig
      }
      cardConfig={{
        title: "角色列表",
      }}
      toolsRender={[
        <AuthShow authKey="admin:role:create" key="RoleFormAdd">
          <RoleFormAdd onSuccess={table.refresh}>
            <Button type="primary" size="middle">新增角色</Button>
          </RoleFormAdd>
        </AuthShow>
      ]}
      columns={[
        {
          "title": "角色名称",
          "dataIndex": "name",
          "key": "name",
          align: 'center',
          "width": 160,
          "ellipsis": true
        },
        {
          "title": "是否禁用",
          "dataIndex": "is_enable",
          "key": "is_enable",
          "width": 100,
          align: 'center',
          "ellipsis": true,
          render(val) {
            return <Switch disabled checked={val}></Switch>
          }
        },
        {
          "title": "更新时间",
          "dataIndex": "updated_at",
          "key": "updated_at",
          "width": 200,
          "ellipsis": true,
          render: (val) => <ToolsTime>{val}</ToolsTime>
        },
        {
          "title": "操作",
          "width": 200,
          align: "center",
          fixed: 'right',
          render: (_, row) => {
            return (
              <Space>
                <AuthShow authKey="admin:role:assign">
                  <AssignMenu itemData={row} onSuccess={table.refresh}>
                    <Button type="link">分配菜单</Button>
                  </AssignMenu>
                </AuthShow>
                <AuthShow authKey="admin:role:update">
                  <RoleFormUpdate itemData={row} onSuccess={table.refresh}>
                    <Button type="link">修改</Button>
                  </RoleFormUpdate>
                </AuthShow>
                <AuthShow authKey="admin:role:delete">
                  <DeleteButton upDateFn={roleDelete} payload={{ id: row.id }} onSuccess={table.refresh}></DeleteButton>
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

export default RoleList
