/*
 * @Author: 赵忠洋
 * @Date: 2021-08-11 13:05:22
 * @LastEditTime: 2021-08-19 11:35:51
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/dict/components/DictKeyFormUpdate.tsx
 */
import { DictListItem, dictUpdate, DictKeyUpdateReq, dictKeyUpdate, DictKeyListItem } from '@/apis/admin_dict';
import { rulesIsRequired } from '@/utils/formRules';
import { ModalForm, ProFormDigit, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { FormInstance, message } from 'antd';
import { useEffect, useRef, useState } from 'react'

interface Props {
  children: JSX.Element
  onSuccess?: () => void
  itemData: DictKeyListItem
}
const DictKeyFormUpdate = (props: Props) => {
  const formRef = useRef<FormInstance>();
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (visible !== true) return
    formRef.current?.setFieldsValue({
      ...props.itemData,
      fid:props.itemData.edges.P.id
    })
  }, [visible])
  return (
    <ModalForm<DictKeyUpdateReq>
      onVisibleChange={setVisible}
      width={520}
      title="更新属性"
      trigger={props.children}
      formRef={formRef}
      initialValues={{
        is_enable: true
      }}
      onFinish={async (values) => {
        try {
          await dictKeyUpdate(values)
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
        label="id"
        placeholder="请输入字典名"
        rules={[rulesIsRequired]}
        hidden
      />
      <ProFormText
        width="md"
        name="fid"
        label="fid"
        rules={[rulesIsRequired]}
        hidden
      />
      <ProFormText
        width="md"
        name="dict_label"
        label="字典标签"
        placeholder="请输入字典标签"
        rules={[rulesIsRequired]}
      />
      <ProFormText
        width="md"
        name="dict_code"
        label="字典键值"
        placeholder="请输入字典键值"
        rules={[rulesIsRequired]}
      />
      <ProFormDigit
        label="Sort"
        name="sort"
        min={0}
        fieldProps={{ precision: 0 }}
      />
      <ProFormText
        width="md"
        name="remarks"
        label="描述"
        placeholder="请输入描述"
      />
      <ProFormSwitch name="is_enable" label="是否启用" />
    </ModalForm>
  )
}

export default DictKeyFormUpdate
