/*
 * @Author: 赵忠洋
 * @Date: 2021-08-06 18:01:27
 * @LastEditTime: 2021-09-27 20:48:04
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
      target: 'https://api.ahh5.com',
      changeOrigin: true,
    },
  },
  dva: {
    immer: true,
    hmr: false,
  },
  dynamicImport: {
    loading: '@/components/loading/Loading',
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
