/*
 * @Author: 赵忠洋
 * @Date: 2021-08-06 18:28:53
 * @LastEditTime: 2021-08-19 16:15:20
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/layouts/admin/AdminLayout.tsx
 */
import { Layout, Menu, PageHeader } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import "./AdminLayout.less"
import SiderLeft from './components/sider-left/SiderLeft';
import { Loading, useDispatch, UserModelState, useSelector, history } from 'umi';
const { Header, Sider, Content } = Layout;
interface Props {
  children: ReactNode;
}
interface LayConfig {
  leftFixed?: boolean
  headerFixed?: boolean
}
const AdminLayout = (props: Props) => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const [layConfig, setLayConfig] = useState<LayConfig>({
    leftFixed: true,
    headerFixed: true
  })
  const userModel = useSelector((state: { user: UserModelState, loading: Loading }) => ({
    ...state.user,
    loading: state.loading.models.auth
  }))
  useEffect(() => {
    if (((userModel?.jwt_data?.expires_at || 0) > new Date().getTime()) || (userModel?.jwt_data?.refresh_expires_at || 0) > new Date().getTime()) {
      dispatch({
        type: "auth/gerOneselfMenus"
      })
    } else {
      history.replace("/login")
    }
  }, [userModel.jwt_data])

  useEffect(() => {
    dispatch({
      type: "dict/getDictCatch"
    })
  },[])
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SiderLeft></SiderLeft>
      </Sider>
      {
        layConfig.leftFixed && (
          <Sider trigger={null} collapsible collapsed={collapsed} className="layout-sider-left-fixed">
            <SiderLeft></SiderLeft>
          </Sider>
        )
      }
      <Layout className="site-layout">

        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        {
          layConfig.headerFixed && (
            <Header className="site-layout-header" style={{ padding: 0, width: `calc(100% - ${collapsed ? 80 : 200}px)` }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </Header>
          )
        }
        <Content
          className="site-layout-background site-layout-content"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: "calc(100vh - 64px - 48px)",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
