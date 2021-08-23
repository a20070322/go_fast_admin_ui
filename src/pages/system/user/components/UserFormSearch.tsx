/*
 * @Author: 赵忠洋
 * @Date: 2021-08-09 12:56:01
 * @LastEditTime: 2021-08-19 16:40:48
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/user/components/UserFormSearch.tsx
 */
import ProCard from '@ant-design/pro-card';
import { QueryFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { roleList } from '@/apis/admin_role';
import { UserListReq } from '@/apis/admin_user';
import { useDict } from '@/hooks/useDict';

interface Props {
  onChange?: (val: UserListReq) => void
  loading?: boolean
}

const UserFormSearch = (props: Props) => {
  return (
    <ProCard>
      <QueryFilter<UserListReq>
        layout="inline"
        defaultCollapsed={false}
        labelWidth="auto"
        submitter={{
          submitButtonProps: {
            loading: props.loading
          },
          resetButtonProps: {
            loading: props.loading
          }
        }}
        onFinish={async (val: UserListReq) => {
          if (typeof props?.onChange === "function") {
            props.onChange(val)
          }
          return true
        }}
        onReset={() => {
          if (typeof props?.onChange === "function") {
            props.onChange({})
          }
        }}
      >
        <ProFormText name="username" label="用户名称" placeholder="请输入用户名称" />
        <ProFormText name="phone" label="手机号" placeholder="请输入手机号" />
        <ProFormSelect
          name="role"
          label="角色"
          placeholder="请选择用户角色"
          request={async () => {
            let { data } = await roleList({ is_all: "1" })
            return data.data.map(item => ({
              label: item.name, value: item.id
            }))
          }}
        />
        <ProFormSelect name="is_enable" label="启用状态" placeholder="请选择启用状态"
          options={useDict("sys_com_enable")}
        />
      </QueryFilter>
    </ProCard>
  )
}

export default UserFormSearch
