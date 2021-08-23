/*
 * @Author: 赵忠洋
 * @Date: 2021-08-13 14:57:43
 * @LastEditTime: 2021-08-13 15:09:41
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/role/components/RoleFormAdd.tsx
 */

import { roleCreate, RoleCreateReq, RoleListItem } from "@/apis/admin_role";
import { rulesIsRequired } from "@/utils/formRules";
import { ModalForm, ProFormSwitch, ProFormText } from "@ant-design/pro-form";
import { FormInstance, message } from "antd";
import { useRef } from "react";

interface Props {
  children: JSX.Element
  onSuccess?: () => void
}

const RoleFormAdd = (props: Props) => {
  const formRef = useRef<FormInstance>();
  return (
    <ModalForm<RoleCreateReq>
      width={520}
      title="新建角色"
      trigger={props.children}
      formRef={formRef}
      initialValues={{
        is_enable: true
      }}
      onFinish={async (values) => {
        try {
          await roleCreate(values)
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
        name="name"
        label="角色名称"
        placeholder="请输入角色名称"
        rules={[rulesIsRequired]}
      />
      <ProFormSwitch name="is_enable" label="是否启用" />
    </ModalForm>
  )
}

export default RoleFormAdd
