/*
 * @Author: 赵忠洋
 * @Date: 2021-08-06 19:16:56
 * @LastEditTime: 2021-08-09 09:47:29
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/layouts/admin/components/sider-left/SiderLeft.tsx
 */
import React, { Fragment } from 'react'
import style from "./SiderLeft.less"
import MenuList from '../menu-list/MenuList';
interface Props {

}
const SiderLeft = (props: Props) => {
  return (
    <Fragment>
      <div className="logo" />
      <MenuList></MenuList>
    </Fragment>
  )
}

export default SiderLeft
