import TabsView from '@/layouts/tabs/TabsView'
<<<<<<< HEAD
import BlankView from '@/layouts/BlankView'
=======
//import BlankView from '@/layouts/BlankView'
>>>>>>> basic_admin
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
<<<<<<< HEAD
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '工作台',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/pages/dashboard/workplace'),
            },
            {
              path: 'analysis',
              name: '分析页',
              component: () => import('@/pages/dashboard/analysis'),
            }
          ]
        },
        {
          path: 'form',
          name: '表单页',
          meta: {
            icon: 'form',
          },
          component: PageView,
          children: [
            {
              path: 'basic',
              name: '基础表单',
              component: () => import('@/pages/form/basic'),
            },
            {
              path: 'step',
              name: '分步表单',
              component: () => import('@/pages/form/step'),
            },
            {
              path: 'advance',
              name: '高级表单',
              component: () => import('@/pages/form/advance'),
            }
          ]
        },
        {
          path: 'list',
          name: '列表页',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'query',
              name: '查询表格',
              meta: {
                authority: 'queryForm',
              },
              component: () => import('@/pages/list/QueryList'),
            },
            {
              path: 'primary',
              name: '标准列表',
              component: () => import('@/pages/list/StandardList'),
            },
            {
              path: 'card',
              name: '卡片列表',
              component: () => import('@/pages/list/CardList'),
            },
            {
              path: 'search',
              name: '搜索列表',
              component: () => import('@/pages/list/search/SearchLayout'),
              children: [
                {
                  path: 'article',
                  name: '文章',
                  component: () => import('@/pages/list/search/ArticleList'),
                },
                {
                  path: 'application',
                  name: '应用',
                  component: () => import('@/pages/list/search/ApplicationList'),
                },
                {
                  path: 'project',
                  name: '项目',
                  component: () => import('@/pages/list/search/ProjectList'),
                }
              ]
            }
          ]
        },
        {
          path: 'details',
          name: '详情页',
          meta: {
            icon: 'profile'
          },
          component: BlankView,
          children: [
            {
              path: 'basic',
              name: '基础详情页',
              component: () => import('@/pages/detail/BasicDetail')
            },
            {
              path: 'advance',
              name: '高级详情页',
              component: () => import('@/pages/detail/AdvancedDetail')
            }
          ]
        },
        {
          path: 'result',
          name: '结果页',
          meta: {
            icon: 'check-circle-o',
=======
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
>>>>>>> basic_admin
          },
          component: PageView,
          children: [
            {
<<<<<<< HEAD
              path: 'success',
              name: '成功',
              component: () => import('@/pages/result/Success')
            },
            {
              path: 'error',
              name: '失败',
              component: () => import('@/pages/result/Error')
            }
          ]
        },
        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          path: 'components',
          name: '内置组件',
          meta: {
            icon: 'appstore-o'
=======
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
>>>>>>> basic_admin
          },
          component: PageView,
          children: [
            {
<<<<<<< HEAD
              path: 'taskCard',
              name: '任务卡片',
              component: () => import('@/pages/components/TaskCard')
            },
            {
              path: 'palette',
              name: '颜色复选框',
              component: () => import('@/pages/components/Palette')
            },
            {
              path: 'table',
              name: '高级表格',
              component: () => import('@/pages/components/table')
            }
          ]
        },
        {
          name: '验权表单',
          path: 'auth/form',
          meta: {
            icon: 'file-excel',
            authority: {
              permission: 'form'
            }
          },
          component: () => import('@/pages/form/basic')
        },
        {
          name: 'Ant Design Vue',
          path: 'antdv',
          meta: {
            icon: 'ant-design',
            link: 'https://www.antdv.com/docs/vue/introduce-cn/'
          }
        },
        {
          name: '使用文档',
          path: 'document',
          meta: {
            icon: 'file-word',
            link: 'https://iczer.gitee.io/vue-antd-admin-docs/'
          }
        }
      ]
    },
=======
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
>>>>>>> basic_admin
  ]
}

export default options
