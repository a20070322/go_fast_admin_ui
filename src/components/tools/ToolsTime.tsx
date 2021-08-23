/*
 * @Author: 赵忠洋
 * @Date: 2021-03-07 18:01:08
 * @LastEditTime: 2021-08-11 09:56:48
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/components/tools/ToolsTime.tsx
 */
import moment from 'moment'
import React, { ReactElement, Fragment } from 'react'

interface Props {
  children: string | number
}

// render: (val) => <ToolsTime time={val} />
function ToolsTime({ children }: Props): ReactElement {
  let date: moment.Moment | string = "-"
  // moment()
  if (typeof children === 'number') {
    if (String(children).length === 10) {
      children *= 100
    }
    if (String(children).length === 13) {
      date = moment(children)
    }
  }
  if (typeof children === 'string') {
    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(children) && children !== "0001-01-01T00:00:00Z") {
      date = moment(children)
    }
  }
  if (typeof date === "string") {
    return <Fragment>{date}</Fragment>
  }
  return (
    <Fragment>{date.format("YYYY-MM-DD HH:mm:ss")}</Fragment>
  )
}

export default ToolsTime
