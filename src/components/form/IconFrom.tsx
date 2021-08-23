/*
 * @Author: 赵忠洋
 * @Date: 2021-08-17 10:22:25
 * @LastEditTime: 2021-08-17 10:59:20
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/components/form/IconFrom.tsx
 */
import React, { useEffect, useState } from 'react'
import * as Icon from '@ant-design/icons';
import IconShow from '../icon-show/IconShow';
import { Button, Dropdown, Input } from 'antd';
interface Props {
  value?: string;
  onChange?: (value: any) => void;
}

const IconFrom = (props: Props) => {
  const icons = Object.keys(Icon).filter(item => !["IconProvider", "setTwoToneColor", "getTwoToneColor", "createFromIconfontCN", "default"].includes(item))
  const [value, setValue] = useState("")
  useEffect(() => {
    setValue(props.value || "")
  }, [props.value])
  return (
    <span>
      <Input
        type="text"
        value={value}
        onChange={(...arg) => {
          console.log(arg);
          props.onChange && props.onChange(...arg)
        }}
        style={{ width: 200 }}
      />
      <Dropdown
        trigger={["click"]}
        overlay={
          <div style={{
            width: 500,
            maxHeight: 500,
            overflow: "auto",
            background: "#fff",
            display: 'flex',
            flexWrap: "wrap"
          }}>
            {icons.map((item, index) => (
              <div
                onClick={() => {
                  props.onChange && props.onChange(item)
                  setValue(item)
                }}
                key={item + index}
                style={{
                  width: 50,
                  height: 50,
                  display: 'flex',
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #eee"
                }}>
                <IconShow iconType={item}></IconShow>
              </div>
            ))}
          </div>
        }>
        <Button type="link">选择ICON</Button>
      </Dropdown>
    </span>
  )
}

export default IconFrom
