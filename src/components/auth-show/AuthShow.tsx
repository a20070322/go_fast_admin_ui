/*
 * @Author: 赵忠洋
 * @Date: 2021-08-06 17:38:04
 * @LastEditTime: 2021-08-09 17:05:55
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI/src/components/auth-show/AuthShow.tsx
 */
import { useSelector, Loading } from 'umi'
import { AuthModelState } from '@/models/auth'
import React, { ReactElement, Fragment } from 'react'

interface Props {
  authKey: string
  noAuth?: ReactElement
  children: React.ReactNode;
}

function AuthShow(props: Props): ReactElement {
  const auth = useSelector((state: { auth: AuthModelState, loading: Loading }) => ({
    ...state.auth,
    loading: state.loading.models.auth
  }))
  if (auth.role.findIndex(item=>item===props.authKey)>-1) {
    return (
      <Fragment>{props.children}</Fragment>
    )
  }
  return (
    props.noAuth||<Fragment></Fragment>
  )
}

export default AuthShow
