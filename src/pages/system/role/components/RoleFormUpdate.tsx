/*
 * @Author: 赵忠洋
 * @Date: 2021-08-13 14:57:43
 * @LastEditTime: 2021-08-13 15:12:03
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/role/components/RoleFormUpdate.tsx
 */

import { roleCreate, RoleCreateReq, RoleListItem, roleUpdate, RoleUpdateReq } from "@/apis/admin_role";
import { rulesIsRequired } from "@/utils/formRules";
import { ModalForm, ProFormSwitch, ProFormText } from "@ant-design/pro-form";
import { FormInstance, message } from "antd";
import { useEffect, useRef } from "react";

interface Props {
  children: JSX.Element
  onSuccess?: () => void
  itemData: RoleListItem
}

const RoleFormUpdate = (props: Props) => {
  const formRef = useRef<FormInstance>();
  useEffect(() => {
    formRef.current?.setFieldsValue({
      ...props.itemData,
    })
  }, [props.itemData])
  return (
    <ModalForm<RoleUpdateReq>
      width={520}
      title="更新角色"
      trigger={props.children}
      formRef={formRef}
      onFinish={async (values) => {
        try {
          await roleUpdate(values)
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
        hidden
        width="md"
        name="id"
        label="ID"
        rules={[rulesIsRequired]}
      />
      <ProFormText
        width="md"
        name="name"
        label="角色名称"
        placeholder="请输入角色名称"
        rules={[rulesIsRequired]}
      />
      <ProFormSwitch name="is_enable" label="是否启用" />
    </ModalForm>
  )
}

export default RoleFormUpdate
