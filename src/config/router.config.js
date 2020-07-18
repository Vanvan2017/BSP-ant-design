// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/mvo-workplace',
    children: [

      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/mvo-workplace',
            name: 'MVO Workplace',
            component: () => import('@/views/dashboard/MVOWorkplace'),
            meta: { title: 'MVO Workplace', keepAlive: false }
          },
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['admin'] }
          }
        ]
      },

      // BVO 啦啦啦啦啦我是卖报的小航家！
      {
        path: '/bvo',
        name: 'BVO',
        redirect: '/bvo/bvo-info',
        component: RouteView,
        meta: { title: 'BVO', keepAlive: true, icon: 'form', permission: ['dashboard'] },
        children: [
          {
            path: '/bvo/bvo-info',
            name: 'BVOInfo',
            component: () => import('@/views/BVO/BVOInfo'),
            meta: { title: 'BVO-Info', keepAlive: false }
          },
          {
            path: '/bvo/my-stores',
            name: 'MyStores',
            component: () => import('@/views/BVO/MyStores'),
            meta: { title: 'MyStores', keepAlive: false }
          },
          {
            path: '/bvo/items-list',
            name: 'ItemsList',
            component: () => import('@/views/BVO/ItemsList'),
            meta: { title: 'ItemsList', keepAlive: false }
          },
          {
            path: '/bvo/wishlist',
            name: 'WishList',
            component: () => import('@/views/BVO/WishList'),
            meta: { title: 'WishList', keepAlive: false }
          },
          {
            path: '/bvo/my-orders',
            name: 'MyOrders',
            component: () => import('@/views/BVO/MyOrders'),
            meta: { title: 'MyOrders', keepAlive: false }
          },
          {
            path: '/bvo/my-wallet',
            name: 'BVO-MyWallet',
            component: () => import('@/views/BVO/MyWallet'),
            meta: { title: 'BVO-MyWallet', keepAlive: false }
          }]
      },

      // MVO 啦啦啦啦啦我是卖报的小航家！
      {
        path: '/mvo',
        name: 'MVO',
        redirect: '/mvo/mvo-info',
        component: RouteView,
        meta: { title: 'MVO', keepAlive: true, icon: 'table' },
        children: [
          {
            path: '/mvo/mvo-info',
            name: 'MVOInfo',
            component: () => import('@/views/MVO/MVOInfo'),
            meta: { title: 'MVO-Info', keepAlive: true }
          },
          {
            path: '/mvo/add-items',
            name: 'AddItems',
            component: () => import('@/views/MVO/AddItems'),
            meta: { title: 'AddItems', keepAlive: false }
          },
          {
            path: '/mvo/items-category',
            name: 'ItemsCategory',
            component: () => import('@/views/MVO/ItemsCategory'),
            meta: { title: 'ItemsCategory', keepAlive: false }
          },
          {
            path: '/mvo/order-management',
            name: 'OrderManagement',
            redirect: '/mvo/order-management/unpaid',
            component: () => import('@/views/MVO/OrderManagement'),
            meta: { title: 'OrderManagement', keepAlive: false },
            children: [
              {
                path: '/mvo/order-management/unpaid',
                name: 'Unpaid',
                component: () => import('@/views/MVO/table/List'),
                meta: { title: 'Unpaid', keepAlive: false }
              },
              {
                path: '/mvo/order-management/unshipped',
                name: 'Unshipped',
                component: () => import('@/views/MVO/table/List'),
                meta: { title: 'Unshipped', keepAlive: false }
              },
              {
                path: '/mvo/order-management/shipped',
                name: 'Shipped',
                component: () => import('@/views/MVO/table/List'),
                meta: { title: 'Shipped', keepAlive: false }
              },
              {
                path: '/mvo/order-management/finished',
                name: 'Finished',
                component: () => import('@/views/MVO/table/List'),
                meta: { title: 'Finished', keepAlive: false }
              },
              {
                path: '/mvo/order-management/cancelled',
                name: 'Cancelled',
                component: () => import('@/views/MVO/table/List'),
                meta: { title: 'Cancelled', keepAlive: false }
              }
            ]
          },
          {
            path: '/mvo/my-wallet',
            name: 'MVO-MyWallet',
            component: () => import('@/views/MVO/stepForm/StepForm'),
            meta: { title: 'MVO-MyWallet', keepAlive: false }
          }
          ]
      },
      {
        path: '/gvo',
        name: 'GVO',
        redirect: '/gvo/gvo-info',
        component: RouteView,
        meta: { title: 'GVO', keepAlive: true, icon: 'table' },
        children: [
          {
            path: '/gvo/data-dict',
            name: 'DataDict',
            component: () => import('@/views/GVO/DataDict'),
            meta: { title: 'DataDict', keepAlive: false }
          },
          {
            path: '/gvo/para-management',
            name: 'ParameterManagement',
            component: () => import('@/views/GVO/ParameterManagement'),
            meta: { title: 'ParameterManagement', keepAlive: false }
          },
          {
            path: '/gvo/perm-management',
            name: 'PermissionManagement',
            component: () => import('@/views/GVO/PermissionManagement'),
            meta: { title: 'PermissionManagement', keepAlive: false }
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView,
        meta: { title: '表单页', icon: 'form', permission: ['table'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/basicForm'),
            meta: { title: '基础表单', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true, permission: ['form'] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/BasicList'),
            meta: { title: '标准列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: ['table'] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: ['table'] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: '搜索列表（项目）', permission: ['table'] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: '搜索列表（应用）', permission: ['table'] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: ['table'] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic'),
            meta: { title: '基础详情页', permission: ['profile'] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: ['profile'] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: RouteView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: ['admin'] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: '403', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: '404', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: '500', permission: [ 'exception' ] }
      //     }
      //   ]
      // },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      },

      // other

      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: ['dashboard'] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: ['support'] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }

    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
