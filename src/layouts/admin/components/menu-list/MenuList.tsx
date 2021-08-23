/*
 * @Author: 赵忠洋
 * @Date: 2021-08-08 22:00:16
 * @LastEditTime: 2021-08-09 10:49:58
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/layouts/admin/components/menu-list/MenuList.tsx
 */
import { AuthModelState } from '@/models/auth'
import React, { Fragment, useEffect, useState } from 'react'
import { Loading, useSelector, history } from 'umi'
import { Menu, Spin } from 'antd'
import IconShow from '@/components/icon-show/IconShow'
import { MenuTree } from '@/apis/admin_auth'

/**
 * 菜单递归渲染
 * @param menuList
 */
const renderMenu: (menuList: MenuTree[]) => React.ReactNode = (menuList) => {
  return menuList.map((menu, index) => {
    if (menu.children && menu.children.length > 0) {
      return (
        <Menu.SubMenu key={menu.id} icon={<IconShow iconType={menu.icon} color="#fff" />} title={menu.name}>
          {
            renderMenu(menu.children)
          }
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item
          key={menu.router_path || index}
          data-router={menu}
          icon={menu.icon ? <IconShow iconType={menu.icon} color="#fff" /> : ''}
        >
          {menu.name}
        </Menu.Item>
      )
    }
  })
}

/**
 * 获取父级
 * @param key 当前url
 * @param menuList 菜单列表
 * @return 父级数组
 */
function getParents(menuList: MenuTree[], key: string,): MenuTree[] {
  let keys: MenuTree[] = []
  function getFn(menuList: MenuTree[], parentsId: MenuTree[] = []): string[] | undefined {
    for (let menu of menuList) {
      if (menu.children instanceof Array) {
        getFn(menu.children, [...parentsId, menu])
      } else {
        if (key === menu.router_path) {
          keys = parentsId
          return
        }
      }
    }
  }
  getFn(menuList)
  return keys
}

interface Props {

}

const MenuList = (props: Props) => {

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKey, setSelectedKey] = useState<string>('')

  const authModel = useSelector((state: { auth: AuthModelState, loading: Loading }) => ({
    ...state.auth,
    loading: state.loading.models.auth
  }))

  useEffect(() => {
    const path = history.location.pathname
    const parents = getParents(authModel.menu, path)
    setOpenKeys(parents.map(item => String(item.id)))
    setSelectedKey(path)

  }, [authModel.menu])
  return (
    <Fragment>
      {
        authModel.loading ? (
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 100
          }}>
            <Spin />
          </div>
        ) : (
          <Menu theme="dark" mode="inline"
            openKeys={openKeys}
            selectedKeys={[selectedKey]}
            onClick={(item) => {
              setSelectedKey(String(item.key))
              history.push(String(item.key))
            }}
            onOpenChange={(keys) => {
              setOpenKeys(Array.from(new Set(keys as string[])))
            }}
          >
            {
              renderMenu(authModel.menu || [])
            }
          </Menu >
        )
      }
    </Fragment>
  )
}
export default MenuList
