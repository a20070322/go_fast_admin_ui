/*
 * @Author: 赵忠洋
 * @Date: 2021-07-30 16:25:46
 * @LastEditTime: 2021-07-30 16:39:08
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /mar_pool_fontend/src/components/icon-show/IconShow.tsx
 */

import React from 'react'
import * as Icon from '@ant-design/icons';
import { Fragment } from 'react';

interface Props {
  size?: number
  color?: string
  iconType: string
}
const IconShow = ({size,color,iconType}: Props) => {
  if (iconType == undefined) {
    return <Fragment></Fragment>
  }
  return React.createElement(
    // @ts-ignore
    Icon[iconType],
    {
      style: {
        ...size?{
          fontSize: size,
        }:{},
        ...color?{
          color: color,
        }:{},
      }
    }
  )
}

export default IconShow
