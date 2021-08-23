/*
 * @Author: 赵忠洋
 * @Date: 2021-08-06 18:01:27
 * @LastEditTime: 2021-08-19 20:34:23
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/.umirc.ts
 */
import { defineConfig } from 'umi';

export default defineConfig({
  title: 'FAST ADMIN',
  nodeModulesTransform: {
    type: 'none',
  },
  devtool: "source-map",
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8088',
      changeOrigin: true,
    },
  },
  dva: {
    immer: true,
    hmr: false,
  },
  history: { type: "hash" },
  publicPath: './',
  // mfsu: {},
  lessLoader: {
    modifyVars: {
      hack: 'true; @import "~@/styles/main.less";',
    },
  },
  routes: [
    {
      path: '/login', component: '@/pages/login/Login'
    },
    {
      path: '/',
      component: '@/layouts/admin/AdminLayout',
      routes: [
        {
          path: '/', component: '@/pages/Index'
        },
        {
          path: '/system/user', component: '@/pages/system/user/UserList'
        },
        {
          path: '/system/role', component: '@/pages/system/role/RoleList'
        },
        {
          path: '/system/menu', component: '@/pages/system/menu/MenuList'
        },
        {
          path: '/system/dict', component: '@/pages/system/dict/DictList'
        },
        {
          path: '/tools/auto_curd', component: '@/pages/tools/auto-curd/AutoCurd'
        },
        {
          path: '*',
          title: "404",
          component: '@/pages/public-page/NotFound'
        },
      ]
    },
    {
      path: '*',
      title: "404",
      component: '@/pages/public-page/NotFound'
    },
  ],
  // fastRefresh: {},
});
