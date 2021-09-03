/*
 * @Author: 赵忠洋
 * @Date: 2021-08-19 20:33:17
 * @LastEditTime: 2021-08-23 19:06:32
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/tools/auto-curd/AutoCurd.tsx
 */
import { useRequest } from '@/.umi/plugin-request/request'
import { autoCurdDefaultConfig } from '@/apis/admin_auto_curd'
import { MenuTreeListItem, menuTreeList } from '@/apis/admin_menu'
import { useDict } from '@/hooks/useDict'
import { findItem, renderTreeNode } from '@/pages/system/menu/components/utils'
import { rulesIsRequired } from '@/utils/formRules'
import ProCard from '@ant-design/pro-card'
import ProForm, { ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { EditableProTable } from "@ant-design/pro-table"
import { Form, FormInstance, TreeSelect } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import EditableTable from './components/EditableTable'

interface Props {

}

const AutoCurd = (props: Props) => {
  const defaultConfigReq = useRequest(autoCurdDefaultConfig)
  // 全部权限获取
  let menuReq = useRequest<RepCommon<MenuTreeListItem[]>>(menuTreeList)
  const formRef = useRef<FormInstance>();
  const [parent, setParent] = useState<MenuTreeListItem | undefined>()
  useEffect(() => {
    formRef.current?.setFieldsValue({
      "model_name": "AutoCurdTest",
      "model_comment": "自动生成测试",
      "work_path": "/Users/zhaozhongyang/Desktop/goAdmin",
      "module_path": "github.com/a20070322/go_fast_admin",
      "schema_path": "ent/schema",
      "service_path": "app/service",
      "controller_path": "app/controller/admin_controller",
      "router_path": "router/router_admin.go",
      "routing_prefix": "/api/admin",
      "is_has_update": true,
      "is_has_delete": true,
      "is_has_show": true,
      "is_has_jwt_auth": true,
      "is_has_rbac": true,
      "is_add_menu": true,
      "is_soft_del": true,
      "mixin": ["AuditMixin"],
      "dataSource": [
        {
          "id": 1629716518824,
          "field_type": "String",
          "field_name": "test_text",
          "field_comment": "文本域测试",
          "field_default": "\"\"",
          "is_sensitive": false,
          "is_optional": true,
          "is_unique": false,
          "is_insert": true,
          "is_edit": true,
          "is_list_show": true,
          "is_list_default_show": true,
          "is_search": true,
          "search_type": "6",
          "show_type": "1",
          "show_config": "",
          "dict_type": ""
        }
      ]
    })
  })
  // useEffect(() => {
  //   if (!defaultConfigReq.loading && defaultConfigReq.data) {
  //     formRef.current?.setFieldsValue({
  //       is_has_update: true,
  //       is_has_delete: true,
  //       is_has_show: true,
  //       is_has_jwt_auth: true,
  //       is_has_rbac: true,
  //       is_add_menu: true,
  //       work_path: defaultConfigReq.data.work_path,
  //       module_path: defaultConfigReq.data.model_name,
  //       router_path: "router/router_admin.go",
  //       routing_prefix: "/api/admin",
  //       schema_path: "ent/schema",
  //       service_path: "app/service",
  //       controller_path: "app/controller/admin_controller"
  //     })
  //   }
  // }, [defaultConfigReq.loading])
  // auto_curd_ent_minxin
  return (
    <ProCard title="代码生成" loading={defaultConfigReq.loading}>
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          console.log(JSON.stringify(values));
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

        <ProForm.Group title="项目路径配置">
          <ProFormText
            width="md"
            name="work_path"
            label="项目绝对路径"
            placeholder="请输入项目绝对路径"
          />
          <ProFormText
            width="md"
            name="module_path"
            label="包路径"
            placeholder="请输入包路径"
          />
        </ProForm.Group>
        <ProForm.Group title="项目输出配置">
          <ProFormText
            width="md"
            name="schema_path"
            label="Schema文件位置"
            placeholder="请输入Schema文件位置"
          />
          <ProFormText
            width="md"
            name="service_path"
            label="Service文件位置"
            placeholder="请输入Service文件位置"
          />
          <ProFormText
            width="md"
            name="controller_path"
            label="Controller文件位置"
            placeholder="请输入Controller文件位置"
          />
        </ProForm.Group>
        <ProForm.Group title="项目路由配置">
          <ProFormText
            width="md"
            name="router_path"
            label="路由文件位置"
            placeholder="请输入路由文件位置"
          />
          <ProFormText
            width="md"
            name="routing_prefix"
            label="路由前缀"
            placeholder="请输入路由前缀"
          />
        </ProForm.Group>
        <ProForm.Group title="生成配置">
          <ProFormSwitch name="is_force" label="是否覆盖式更新" />
          <ProFormSwitch name="is_has_update" label="更新操作" />
          <ProFormSwitch name="is_has_delete" label="删除操作" />
          <ProFormSwitch name="is_has_show" label="查看操作" />
          <ProFormSwitch name="is_has_jwt_auth" label="jwt鉴权" />
          <ProFormSwitch name="is_has_rbac" label="权限控制" />
          <ProFormSwitch name="is_add_menu" label="注入系统菜单" />
          <Form.Item
            label="父级菜单"
            name="fid"
          >
            <TreeSelect
              showSearch
              style={{ width: 328 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择父级菜单"
              allowClear
              treeDefaultExpandAll
              onChange={(id) => {
                setParent(findItem(menuReq.data || [], Number(id)))
              }}
            >
              {
                renderTreeNode(menuReq.data || [])
              }
            </TreeSelect>
          </Form.Item>
        </ProForm.Group>
        <ProForm.Group title="字段信息">
          <ProFormSwitch name="is_soft_del" label="是否开启软删除" />
          <ProFormSelect
            width="md"
            mode="multiple"
            name="mixin"
            label="混入模板"
            placeholder="请选择混入模板"
            options={useDict("auto_curd_ent_minxin")}
          />
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
