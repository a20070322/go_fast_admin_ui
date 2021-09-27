/*
 * @Author: 赵忠洋
 * @Date: 2021-08-17 09:12:57
 * @LastEditTime: 2021-09-18 13:45:17
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/menu/components/MenuFormAdd.tsx
 */
import { useRequest } from '@/.umi/plugin-request/request';
import { MenuTreeListItem, menuTreeList, menuCreate, MenuCreateReq } from '@/apis/admin_menu';
import IconFrom from '@/components/form/IconFrom';
import { rulesIsRequired } from '@/utils/formRules';
import ProForm, { DrawerForm, FormInstance, ProFormDependency, ProFormDigit, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form'
import { Form, message, TreeSelect } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { Fragment } from 'react';
import { optionsData, findItem, renderTreeNode } from './utils';


interface Props {
  children: JSX.Element
  onSuccess?: () => void
  fid?: number
}

const MenuFormAdd = (props: Props) => {
  // 全部权限获取
  let menuReq = useRequest<RepCommon<MenuTreeListItem[]>>(menuTreeList, {
    manual: true
  })
  const formRef = useRef<FormInstance>();
  const [visible, setVisible] = useState(false)
  const [parent, setParent] = useState<MenuTreeListItem | undefined>()
  useEffect(() => {
    if (!visible) return
    menuReq.run()
    if (props.fid) {
      formRef.current?.setFieldsValue({
        fid: props.fid
      })
      setParent(findItem(menuReq.data || [], props.fid || 0))
    }
  }, [visible])
  return (
    <DrawerForm<MenuCreateReq>
      onVisibleChange={setVisible}
      title="新建菜单"
      trigger={props.children}
      formRef={formRef}
      initialValues={{
        is_enable: true
      }}
      onFinish={async (values) => {
        try {
          console.log(values);
          await menuCreate(values)
          message.success("提交成功")
          formRef.current?.resetFields()
          props.onSuccess && props.onSuccess()
          return true
        } catch (error:any) {
          message.error(`操作失败:${error.msg || "系统错误"}`,)
          return false
        }
      }}
    >
      <ProForm.Group>
        <ProFormText
          rules={[rulesIsRequired]}
          width="md"
          name="name"
          label="菜单名称"
          placeholder="请输入菜单名称"
        />
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
      <ProForm.Group>
        <ProFormRadio.Group
          width="md"
          rules={[rulesIsRequired]}
          name="type"
          label="菜单类型"
          options={optionsData}
        />
        <ProFormDigit
          label="Sort"
          name="sort"
          min={0}
          fieldProps={{ precision: 0 }}
        />
      </ProForm.Group>
      <ProFormDependency name={["type"]}>
        {(data => {
          return (
            <Fragment>
              {
                (data.type === 1 || data.type === 2) && (
                  <ProForm.Group>
                    <Form.Item
                      label="ICON"
                      name="icon"
                    >
                      <IconFrom></IconFrom>
                    </Form.Item>
                  </ProForm.Group>
                )
              }
              {
                (data.type === 2 || data.type === 3 || data.type === 4) && (
                  <Fragment>
                    <ProForm.Group>
                      <ProFormText
                        rules={[rulesIsRequired]}
                        width="md"
                        name="path"
                        label="请求路径"
                        placeholder="请输入请求路径"
                      />
                      <ProFormSelect
                        width="md"
                        name="path_action"
                        label="请求方式"
                        placeholder="请选择请求方式"
                        rules={[rulesIsRequired]}
                        options={[
                          {
                            label: 'GET',
                            value: 'GET',
                          },
                          {
                            label: 'POST',
                            value: 'POST',
                          },
                          {
                            label: 'PUT',
                            value: 'PUT',
                          },
                          {
                            label: 'DELETE',
                            value: 'DELETE',
                          },
                          {
                            label: 'ANY',
                            value: 'ANY',
                          }
                        ]}
                      />
                    </ProForm.Group>
                    <ProForm.Group>
                      {
                        data.type === 2 && (
                          <ProFormText
                            key='router_path'
                            rules={[rulesIsRequired]}
                            width="md"
                            name="router_path"
                            label="页面路径"
                            placeholder="请输入页面路径"
                          />
                        )
                      }
                      {
                        (data.type === 2 || data.type === 3) && (
                          <ProFormText
                            key='power_str'
                            rules={[rulesIsRequired]}
                            width="md"
                            name="power_str"
                            label="权限标识"
                            placeholder="请输入权限标识"
                          />
                        )
                      }
                    </ProForm.Group>
                  </Fragment>
                )}
              <ProForm.Group>
                {
                  (data.type === 2) && (
                    <ProFormSwitch width="md" name="is_external_link" label="是否外链" />
                  )
                }
                {
                  ([1, 2, 3].includes(data.type)) && (
                    <ProFormSwitch width="md" name="is_show" label="是否展示" {...(parent?.type !== 1 && (data.type === 2 || data.type === 1)) ? { disabled: true } : {}} />
                  )
                }
                <ProFormSwitch width="md" name="is_enable" label="是否启用" />
              </ProForm.Group>
            </Fragment>
          )
        })}
      </ProFormDependency>
    </DrawerForm>
  )
}

export default MenuFormAdd
