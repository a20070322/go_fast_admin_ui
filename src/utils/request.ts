/*
 * @Author: 赵忠洋
 * @Date: 2021-08-06 20:58:00
 * @LastEditTime: 2021-08-13 09:49:06
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/utils/request.ts
 */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';
import { history, getDvaApp, JwtDataType } from "umi"
import { refresh_token } from '@/apis/admin_auth';
/**
 * 异常处理程序
 */
const errorHandler = async (error: { response: Response }): Promise<Response> => {
  const { response } = error;
  const result = await response.clone().json();
  throw result
};
/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler: errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});

// 请求拦截器
request.interceptors.request.use((url, options) => ({
  url,
  options: {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': "Bearer " + JSON.parse(window.localStorage.getItem('jwtData') || 'null')?.token ?? ''
    },
  },
}));

// 相应拦截器
request.interceptors.response.use(async (response, options) => {
  const result = await response.clone().json();
  const { code, msg } = result
  if (code === 401) {
    try {
      return await handleNoAuthResponse(response.url, options)
    } catch (error) {
      console.log(error)
      // 请求异常
      history.replace("/login")
    }
  }
  if (code > 400 || !code) {
    notification.error({
      message: '操作提示',
      description: msg || '接口异常',
    });
    throw new Error(result);
  }
  return response;
});

// 刷新token后的任务队列
let refreshTokenArray: (() => void)[] = []
// 是否正在刷新token
let refreshTokenLoding = false
const handleNoAuthResponse = async (url: string, options: RequestOptionsInit) => {
  // 如果未在刷新中
  if (!refreshTokenLoding) {
    refreshTokenLoding = true
    try {
      // 执行刷新token
      await refreshTokenFn()
      // 执行刷新后任务队列
      refreshTokenArray.forEach(item => item())
      //清除任务队列
      refreshTokenArray = []
      return request(url, options)
    } catch (error) {
      notification.error({
        message: '操作提示',
        description: "登录过期重新登录",
      })
      throw new Error(error)
    } finally {
      refreshTokenLoding = false
    }
  }
  return new Promise(resolve => {
    // 当前请求加入至刷新后的任务队列中
    refreshTokenArray.push(function () {
      resolve(request(url, options))
    })
  })
}
const refreshTokenFn = async () => {
  let jwtData: JwtDataType = JSON.parse(window.localStorage.getItem('jwtData') || 'null')
  if (jwtData.refresh_token && (jwtData?.refresh_expires_at || 0) > new Date().getTime()) {
    try {
      let repData = await refresh_token({
        refresh_token: jwtData.refresh_token
      })
      //调用了_方法,知道不对但是没有办法
      getDvaApp()._store.dispatch({
        type: 'user/setUser',
        payload: {
          user: repData.data.user,
          jwt_data: repData.data.jwt_data
        }
      })
      return
    } catch (error) {
      throw new Error("登录过期_0024")
    }
  }
  throw new Error("登录过期_0023")
}
export default request;
