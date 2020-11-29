import TabsView from '@/layouts/tabs/TabsView'
//import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'dashboard/workplace',
          name: '首页',
          meta: {
            icon: 'dashboard'
          },
          //component: BlankView,
          component: () => import('@/pages/dashboard/workplace'),
          // children: [
          //   {
          //     path: '',
          //     name: '工作台',
              
          //   }
          // ]
        },
        {
          path: '/split/screen/display',
          name: '分屏展示',
          meta: {
            icon: 'appstore'
          },
          component: () => import('@/pages/split/screen_display')
        },
        // {
        //   path: 'parent1',
        //   name: '父级路由1',
        //   meta: {
        //     icon: 'dashboard',
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'demo1',
        //       name: '演示页面1',
        //       component: () => import('@/pages/demo'),
        //     }
        //   ]
        // },
        {
          path: 'device',
          name: '设备管理',
          meta: {
            icon: 'build'
          },
          component: PageView,
          children: [
            {
              path: '/device',
              name: '设备列表',
              component: () => import('@/pages/device/device-list'),
            },
            {
              path: '/device/channel',
              name: '设备渠道',
              hidden: true,
              meta: {
                invisible: true
              },
              component: () => import('@/pages/device/channel-list'),
            },
            {
              path: '/device/channel/recording',
              name: '设备录像',
              meta: {
                invisible: true
              },
              component: () => import('@/pages/recording/device_recording'),
            }
          ]
        }
        ,
        {
          path: 'recording',
          name: '云端录像',
          meta: {
            icon: 'pull-request'
          },
          component: PageView,
          children: [
            {
              path: '/recording/list',
              name: '录像列表',
              component: () => import('@/pages/device/device-list'),
            },
            {
              path: '/recording/plan',
              name: '录像计划',
              component: () => import('@/pages/recording/recording_plan'),
            },
          ]
        }
        // {
        //   path: 'exception',
        //   name: '异常页',
        //   meta: {
        //     icon: 'warning',
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: '404',
        //       name: 'Exp404',
        //       component: () => import('@/pages/exception/404')
        //     },
        //     {
        //       path: '403',
        //       name: 'Exp403',
        //       component: () => import('@/pages/exception/403')
        //     },
        //     {
        //       path: '500',
        //       name: 'Exp500',
        //       component: () => import('@/pages/exception/500')
        //     }
        //   ]
        // },
        // {
        //   name: '验权页面',
        //   path: 'auth/demo',
        //   meta: {
        //     icon: 'file-ppt',
        //     authority: {
        //       permission: 'form',
        //       role: 'manager'
        //     },
        //     component: () => import('@/pages/demo')
        //   }
        // }
      ]
    }
  ]
}

export default options
