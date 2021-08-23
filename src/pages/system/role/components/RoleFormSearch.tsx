/*
 * @Author: 赵忠洋
 * @Date: 2021-08-13 14:49:54
 * @LastEditTime: 2021-08-19 16:42:11
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/role/components/RoleFormSearch.tsx
 */
import { RoleListReq } from '@/apis/admin_role'
import { useDict } from '@/hooks/useDict'
import ProCard from '@ant-design/pro-card'
import { ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-form'

interface Props {
  onChange?: (val: RoleListReq) => void
  loading?: boolean
}

const RoleFormSearch = (props: Props) => {
  return (
    <ProCard>
      <QueryFilter<RoleListReq>
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
        onFinish={async (val: RoleListReq) => {
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
        <ProFormText name="name" label="角色名称" placeholder="请输入角色名称" />
        <ProFormSelect name="is_enable" label="启用状态" placeholder="请选择启用状态"
          options={useDict("sys_com_enable")}
        />
      </QueryFilter>
    </ProCard>
  )
}

export default RoleFormSearch
