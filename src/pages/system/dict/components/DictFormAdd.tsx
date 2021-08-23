/*
 * @Author: 赵忠洋
 * @Date: 2021-08-11 13:05:22
 * @LastEditTime: 2021-08-18 16:35:54
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/dict/components/DictFormAdd.tsx
 */
import { roleList } from '@/apis/admin_role';
import { dictCreate, DictCreateReq } from '@/apis/admin_dict';
import { rulesIsRequired, rulesPhone } from '@/utils/formRules';
import { ModalForm, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { FormInstance, message } from 'antd';
import { useRef } from 'react'

interface Props {
  children: JSX.Element
  onSuccess?: () => void
}
const DictFormAdd = (props: Props) => {
  const formRef = useRef<FormInstance>();
  return (
    <ModalForm<DictCreateReq>
      width={520}
      title="新建字典"
      trigger={props.children}
      formRef={formRef}
      initialValues={{
        is_enable: true
      }}
      onFinish={async (values) => {
        try {
          await dictCreate(values)
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
        name="dict_name"
        label="字典名称"
        placeholder="请输入字典名"
        rules={[rulesIsRequired]}
      />
      <ProFormText
        width="md"
        name="dict_type"
        label="字典类型"
        tooltip="本系统唯一"
        placeholder="请输入字典类型"
        rules={[rulesIsRequired]}
      />
      <ProFormText
        width="md"
        name="remarks"
        label="备注"
        placeholder="请输入备注"
      />
      <ProFormSwitch name="is_enable" label="是否启用" />
    </ModalForm>
  )
}

export default DictFormAdd
