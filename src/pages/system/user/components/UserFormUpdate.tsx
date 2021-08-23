/*
 * @Author: 赵忠洋
 * @Date: 2021-08-11 13:05:22
 * @LastEditTime: 2021-08-13 10:36:06
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/user/components/UserFormUpdate.tsx
 */
import { roleList } from '@/apis/admin_role';
import { UserListItem, userUpdate, UserUpdateReq } from '@/apis/admin_user';
import { rulesIsRequired, rulesPhone } from '@/utils/formRules';
import { ModalForm, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { FormInstance, message } from 'antd';
import { useEffect, useRef } from 'react'

interface Props {
  children: JSX.Element
  itemData: UserListItem
  onSuccess?: () => void
}
const UserFormUpdate = (props: Props) => {
  const formRef = useRef<FormInstance>();
  useEffect(() => {
    formRef.current?.setFieldsValue({
      ...props.itemData,
      roles: props.itemData.edges.role.map(item => item.id)
    })
  }, [props.itemData])
  return (
    <ModalForm<UserUpdateReq>
      width={520}
      title="更新用户"
      trigger={props.children}
      formRef={formRef}
      onFinish={async (values) => {
        try {
          await userUpdate(values)
          message.success("提交成功")
          formRef.current?.resetFields()
          props.onSuccess && props.onSuccess()
          return true
        } catch (error) {
          message.error(`操作失败:${error.msg || "系统错误"}`,)
          return false
        }
      }}
    >
      <ProFormText
        width="md"
        name="id"
        label="用户id"
        rules={[rulesIsRequired]}
        hidden
      />
      <ProFormText
        width="md"
        name="username"
        label="用户名称"
        tooltip="本系统唯一"
        placeholder="请输入用户名"
        rules={[rulesIsRequired]}
      />
      <ProFormSelect
        width="md"
        name="roles"
        label="用户角色"
        tooltip="可以选择多个"
        placeholder="请选择用户角色"
        rules={[rulesIsRequired]}
        request={async () => {
          let { data } = await roleList({ is_all: "1" })
          return data.data.map(item => ({
            label: item.name, value: item.id
          }))
        }}
        mode="multiple"
        allowClear
      />
      <ProFormText
        width="md"
        name="avatar"
        label="头像"
        placeholder="请输入头像"
      />
      <ProFormText
        width="md"
        name="phone"
        label="联系电话"
        placeholder="请输入用户手机号"
        rules={[rulesPhone]}
      />
      <ProFormSwitch name="is_enable" label="是否启用" />
    </ModalForm>
  )
}

export default UserFormUpdate
