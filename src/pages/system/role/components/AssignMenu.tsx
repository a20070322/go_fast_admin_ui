/*
 * @Author: 赵忠洋
 * @Date: 2021-08-13 17:52:25
 * @LastEditTime: 2021-08-17 09:03:03
 * @LastEditors: 赵忠洋
 * @Description:分配菜单
 * @FilePath: /goAdminUI2/src/pages/system/role/components/AssignMenu.tsx
 */
import { useRequest } from '@/.umi/plugin-request/request'
import { menuTreeList, MenuTreeListItem } from '@/apis/admin_menu'
import { roleFindMenus, RoleFindMenusRep, RoleFindMenusReq, RoleListItem, roleMenuUpdate, RoleMenuUpdateReq, roleUpdate, RoleUpdateReq } from '@/apis/admin_role'
import IconShow from '@/components/icon-show/IconShow'
import { rulesIsRequired } from '@/utils/formRules'
import { menuTypeMapData } from '@/utils/utils'
import { DrawerForm, ProFormText } from '@ant-design/pro-form'
import { Form, FormInstance, message, Spin, Tree } from 'antd'
import { useEffect, useRef, useState } from 'react'

interface Props {
  children: JSX.Element
  onSuccess?: () => void
  itemData: RoleListItem
}
const getChildId = (data: MenuTreeListItem[]): number[] => data.reduce((pre: number[], item: MenuTreeListItem) => [...pre, item.id, ...getChildId(item.children)], [])
const treeToArray = (data: MenuTreeListItem[]): MenuTreeListItem[] => data.reduce((pre: MenuTreeListItem[], item: MenuTreeListItem) => [...pre, item, ...treeToArray(item.children)], [])
const getParentIds = (fid: number, data: MenuTreeListItem[]): number[] => {
  let ids: number[] = []
  data.forEach(item => {
    console.log(item.id)
    if (item.id === fid) {
      ids.push(item.id)
      if (item.fid != 0) {
        ids.push(...getParentIds(item.fid, data))
      }
    }
  })
  return ids
}

const AssignMenu = (props: Props) => {
  const formRef = useRef<FormInstance>();
  const [visible, setVisible] = useState(false)
  const [keys, setKeys] = useState<number[]>([])

  const handleMenu = (data: MenuTreeListItem[]): MenuTreeListItem[] => {
    return data.map(item => ({
      ...item,
      key: item.id,
      title: item.name,
      icon: <IconShow color={menuTypeMapData[item.type].color} iconType={menuTypeMapData[item.type].icon}></IconShow>,
      children: item.children ? handleMenu(item.children) : []
    }))
  }

  //用户权限获取
  let roleMenuReq = useRequest<RepCommon<Array<RoleFindMenusRep>>, Array<RoleFindMenusReq>>(roleFindMenus, {
    manual: true,
    formatResult(val) {
      return val?.data?.map(item => item.id) || []
    },
    onSuccess(res) {
      setKeys(res)
    }
  })
  // 全部权限获取
  let menuReq = useRequest<RepCommon<MenuTreeListItem[]>>(menuTreeList, {
    manual: true,
    formatResult(res) {
      return handleMenu(res.data)
    }
  })
  useEffect(() => {
    if (visible) {
      formRef.current?.setFieldsValue({
        ...props.itemData,
      })
      roleMenuReq.run({ id: props.itemData.id })
      menuReq.run()
    }
  }, [props.itemData, visible])
  return (
    <DrawerForm<RoleMenuUpdateReq>
      onVisibleChange={setVisible}
      width={520}
      title="分配菜单"
      trigger={props.children}
      formRef={formRef}
      onFinish={async (values) => {
        try {
          await roleMenuUpdate({
            ...values,
            menus: keys
          })
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
      <Form.Item label="菜单列表">
        <Spin spinning={menuReq.loading || roleMenuReq.loading}>
          <div
            style={{
              marginTop: 8,
            }}
          >
            {
              menuReq.data && (
                <Tree
                  // height={500}
                  showIcon
                  // 完全受控
                  checkable
                  checkStrictly
                  defaultExpandAll
                  checkedKeys={keys}
                  onCheck={(ckeys, event) => {
                    let active_keys: number[] = [Number(event.node.key), ...getChildId(event.node.children as MenuTreeListItem[])]
                    if (!event.node.checked) {
                      let node = (event.node as unknown as MenuTreeListItem)
                      let pIds: number[] = node.fid != 0 ? getParentIds(node.fid, treeToArray(menuReq.data)) : []
                      setKeys(Array.from(new Set([...keys, ...active_keys, ...pIds])))
                    } else {
                      setKeys(keys.filter(item => active_keys.findIndex(sitem => sitem === item) === -1))
                    }
                  }}
                  treeData={menuReq.data || []}
                />
              )
            }
          </div>
        </Spin>
      </Form.Item>
    </DrawerForm>
  )
}

export default AssignMenu
