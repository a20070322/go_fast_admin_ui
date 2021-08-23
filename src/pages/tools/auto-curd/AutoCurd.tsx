/*
 * @Author: 赵忠洋
 * @Date: 2021-08-19 20:33:17
 * @LastEditTime: 2021-08-23 15:42:42
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/tools/auto-curd/AutoCurd.tsx
 */
import { useRequest } from '@/.umi/plugin-request/request'
import { autoCurdDefaultConfig } from '@/apis/admin_auto_curd'
import { rulesIsRequired } from '@/utils/formRules'
import ProCard from '@ant-design/pro-card'
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { EditableProTable } from "@ant-design/pro-table"
import { Form } from 'antd'
import React, { useState } from 'react'
import EditableTable from './components/EditableTable'

interface Props {

}

const AutoCurd = (props: Props) => {
  const defaultConfigReq = useRequest(autoCurdDefaultConfig)

  // auto_curd_ent_minxin
  return (
    <ProCard title="代码生成">
      <ProForm
        onFinish={async (values) => {
          console.log(values);
          // try {
          //   await dictCreate(values)
          //   message.success("提交成功")
          //   formRef.current?.resetFields()
          //   props.onSuccess && props.onSuccess()
          //   return true
          // } catch (error) {
          //   message.error(`操作失败:${error.msg || "系统错误"}`,)
          //   return false
          // }
        }}
      >
        <ProForm.Group title="基础信息">
          <ProFormText
            width="md"
            name="model_name"
            label="模块名称"
            tooltip="后续的名称会依赖于模块名称"
            placeholder="请输入模块名称"
            rules={[rulesIsRequired]}
          />
          <ProFormText
            name="model_comment"
            width="md"
            label="模块描述"
            placeholder="请输入模块描述"
          />
        </ProForm.Group>
        <ProForm.Group title="字段信息">
          <Form.Item
            label="字段数据集"
            name="dataSource"
          >
            <EditableTable></EditableTable>
          </Form.Item>
        </ProForm.Group>
      </ProForm>
    </ProCard >
  )
}

export default AutoCurd
