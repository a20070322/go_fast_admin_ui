/*
 * @Author: 赵忠洋
 * @Date: 2021-08-09 10:24:00
 * @LastEditTime: 2021-08-13 10:37:21
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/user/UserList.tsx
 */
import { userDelete, userList, UserListItem, UserListRep, UserListReq } from '@/apis/admin_user'
import ToolsTime from '@/components/tools/ToolsTime';
import { useTable } from '@/hooks/useTable';
import { Button, Space, Switch } from 'antd';
import UserFormSearch from './components/UserFormSearch';
import AdminTable from '@/components/admin-table/AdminTable';
import UserFormAdd from './components/UserFormAdd';
import UserFormUpdate from './components/UserFormUpdate';
import DeleteButton from '@/components/admin-table/DeleteButton';
import AuthShow from '@/components/auth-show/AuthShow';
interface Props {

}
const UserList = (props: Props) => {
  let table = useTable<RepCommon<UserListRep>, UserListReq, UserListItem>({
    service: userList
  })
  return (
    <AdminTable
      refresh={table.refresh}
      header={<UserFormSearch {...table.formSearchConfig}></UserFormSearch>}
      rowKey="id"
      {
      ...table.tableConfig
      }
      cardConfig={{
        title: "用户列表",
      }}
      toolsRender={[
        <AuthShow authKey="admin:user:create" key="UserFormAdd">
          <UserFormAdd onSuccess={table.refresh}>
            <Button type="primary" size="middle">新增用户</Button>
          </UserFormAdd>
        </AuthShow>
      ]}
      columns={[
        {
          "title": "用户名",
          "dataIndex": "username",
          "key": "username",
          "width": 140,
          "ellipsis": true
        },
        {
          "title": "角色",
          "dataIndex": "role",
          "width": 140,
          // "ellipsis": true,
          render(_, row) {
            return row.edges?.role?.length > 0 ? row.edges?.role.map(item => item.name).join(",") : '-'
          }
        },
        {
          "title": "头像",
          "dataIndex": "avatar",
          "key": "avatar",
          "width": 120,
          "ellipsis": true,
        },
        {
          "title": "手机号",
          "dataIndex": "phone",
          "key": "phone",
          "width": 200,
          "ellipsis": true,
        },
        {
          "title": "是否启用",
          "dataIndex": "is_enable",
          "key": "is_enable",
          "width": 100,
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
                <AuthShow authKey="admin:user:update">
                  <UserFormUpdate itemData={row} onSuccess={table.refresh}>
                    <Button type="link">修改</Button>
                  </UserFormUpdate>
                </AuthShow>
                <AuthShow authKey="admin:user:delete">
                  <DeleteButton upDateFn={userDelete} payload={{ id: row.id }} onSuccess={table.refresh}></DeleteButton>
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

export default UserList
