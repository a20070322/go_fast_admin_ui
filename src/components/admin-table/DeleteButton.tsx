/*
 * @Author: 赵忠洋
 * @Date: 2021-08-13 10:14:26
 * @LastEditTime: 2021-08-13 10:22:16
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/components/admin-table/DeleteButton.tsx
 */
import { Button, message, Popconfirm } from 'antd'
import React from 'react'

interface Props {
  upDateFn(data: any): Promise<RepCommon>
  payload: any
  onSuccess?: () => void
}
const DeleteButton = (props: Props) => {
  return (
    <Popconfirm
      placement="topRight"
      title="是否确定删除？"
      onConfirm={async () => {
        try {
          await props.upDateFn(props.payload)
          message.success("删除成功")
          props.onSuccess && props.onSuccess()
          return true
        } catch (error) {
          message.error(`删除失败:${error.msg || "系统错误"}`,)
          return false
        }
      }}
      okText="确认"
      cancelText="取消"
    >
      <Button type="link" danger>
        删除
      </Button>
    </Popconfirm>
  )
}

export default DeleteButton
