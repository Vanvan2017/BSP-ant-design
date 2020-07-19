// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout
  // BlankLayout,
  // PageView
} from '@/layouts'
import {
  bxAnaalyse
} from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  // dashboard
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: 'menu.home'
      // permission: ['admin']
    },
    redirect: '/dashboard/mvo-workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: 'menu.dashboard',
          keepAlive: true,
          icon: bxAnaalyse,
          permission: ['admin']
        },
        children: [{
            path: '/dashboard/mvo-workplace',
            name: 'MVO Workplace',
            component: () => import('@/views/dashboard/MVOWorkplace'),
            meta: {
              title: 'MVO Workplace',
              keepAlive: false,
              permission: ['admin']
            }
          },
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {
              title: 'menu.dashboard.analysis',
              keepAlive: false,
              permission: ['admin']
            }
          }
        ]
      },

      // BVO 啦啦啦啦啦我是卖报的小航家！
      {
        path: '/bvo',
        name: 'BVO',
        redirect: '/bvo/bvo-info',
        component: RouteView,
        meta: {
          title: 'BVO',
          keepAlive: true,
          icon: 'form',
          permission: ['bvo']
        },
        children: [{
            path: '/bvo/bvo-info',
            name: 'BVOInfo',
            component: () => import('@/views/BVO/BVOInfo'),
            meta: {
              title: 'BVO-Info',
              keepAlive: false,
              permission: ['bvo']
            }
          },
          {
            path: '/bvo/my-stores',
            name: 'MyStores',
            component: () => import('@/views/BVO/MyStores'),
            meta: {
              title: 'MyStores',
              keepAlive: false,
              permission: ['bvo']
            }
          },
          {
            path: '/bvo/items-list',
            name: 'ItemsList',
            component: () => import('@/views/BVO/ItemsList'),
            meta: {
              title: 'ItemsList',
              keepAlive: false,
              permission: ['bvo']
            }
          },
          {
            path: '/bvo/wishlist',
            name: 'WishList',
            component: () => import('@/views/BVO/WishList'),
            meta: {
              title: 'WishList',
              keepAlive: false,
              permission: ['bvo']
            }
          },
          {
            path: '/bvo/my-orders',
            name: 'MyOrders',
            component: () => import('@/views/BVO/MyOrders'),
            meta: {
              title: 'MyOrders',
              keepAlive: false,
              permission: ['bvo']
            }
          },
          {
            path: '/bvo/my-wallet',
            name: 'BVO-MyWallet',
            component: () => import('@/views/BVO/MyWallet'),
            meta: {
              title: 'BVO-MyWallet',
              keepAlive: false,
              permission: ['bvo']
            }
          }
        ]
      },

      // MVO 啦啦啦啦啦我是卖报的小航家！
      {
        path: '/mvo',
        name: 'MVO',
        redirect: '/mvo/mvo-info',
        component: RouteView,
        meta: {
          title: 'MVO',
          keepAlive: true,
          icon: 'table',
          permission: ['mvo']
        },
        children: [{
            path: '/mvo/mvo-info',
            name: 'MVOInfo',
            component: () => import('@/views/MVO/MVOInfo'),
            meta: {
              title: 'MVO-Info',
              keepAlive: true,
              permission: ['mvo']
            }
          },
          {
            path: '/mvo/add-items',
            name: 'AddItems',
            component: () => import('@/views/MVO/AddItems'),
            meta: {
              title: 'AddItems',
              keepAlive: false,
              permission: ['mvo']
            }
          },
          {
            path: '/mvo/items-category',
            name: 'ItemsCategory',
            component: () => import('@/views/MVO/ItemsCategory'),
            meta: {
              title: 'ItemsCategory',
              keepAlive: false,
              permission: ['mvo']
            }
          },
          {
            path: '/mvo/order-management',
            name: 'OrderManagement',
            redirect: '/mvo/order-management/unpaid',
            component: () => import('@/views/MVO/OrderManagement'),
            meta: {
              title: 'OrderManagement',
              keepAlive: false,
              permission: ['mvo']
            },
            children: [{
                path: '/mvo/order-management/unpaid',
                name: 'Unpaid',
                component: () => import('@/views/MVO/table/List'),
                meta: {
                  title: 'Unpaid',
                  keepAlive: false,
                  permission: ['mvo']
                }
              },
              {
                path: '/mvo/order-management/unshipped',
                name: 'Unshipped',
                component: () => import('@/views/MVO/table/List'),
                meta: {
                  title: 'Unshipped',
                  keepAlive: false,
                  permission: ['mvo']
                }
              },
              {
                path: '/mvo/order-management/shipped',
                name: 'Shipped',
                component: () => import('@/views/MVO/table/List'),
                meta: {
                  title: 'Shipped',
                  keepAlive: false,
                  permission: ['mvo']
                }
              },
              {
                path: '/mvo/order-management/finished',
                name: 'Finished',
                component: () => import('@/views/MVO/table/List'),
                meta: {
                  title: 'Finished',
                  keepAlive: false,
                  permission: ['mvo']
                }
              },
              {
                path: '/mvo/order-management/cancelled',
                name: 'Cancelled',
                component: () => import('@/views/MVO/table/List'),
                meta: {
                  title: 'Cancelled',
                  keepAlive: false,
                  permission: ['mvo']
                }
              }
            ]
          },
          {
            path: '/mvo/my-wallet',
            name: 'MVO-MyWallet',
            component: () => import('@/views/MVO/MyWallet'),
            meta: {
              title: 'MVO-MyWallet',
              keepAlive: false,
              permission: ['mvo']
            }
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView,
        meta: {
          title: '表单页',
          icon: 'form',
          permission: ['form']
        },
        children: [{
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/basicForm'),
            meta: {
              title: '基础表单',
              keepAlive: true,
              permission: ['form']
            }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: {
              title: '分步表单',
              keepAlive: true,
              permission: ['form']
            }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: {
              title: '高级表单',
              keepAlive: true,
              permission: ['form']
            }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: {
          title: '列表页',
          icon: 'table',
          permission: ['table']
        },
        children: [{
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: {
              title: '查询表格',
              keepAlive: true,
              permission: ['table']
            }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/BasicList'),
            meta: {
              title: '标准列表',
              keepAlive: true,
              permission: ['table']
            }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: {
              title: '卡片列表',
              keepAlive: true,
              permission: ['table']
            }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: {
              title: '搜索列表',
              keepAlive: true,
              permission: ['table']
            },
            children: [{
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: {
                  title: '搜索列表（文章）',
                  permission: ['table']
                }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: {
                  title: '搜索列表（项目）',
                  permission: ['table']
                }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: {
                  title: '搜索列表（应用）',
                  permission: ['table']
                }
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
        meta: {
          title: '详情页',
          icon: 'profile',
          permission: ['profile']
        },
        children: [{
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic'),
            meta: {
              title: '基础详情页',
              permission: ['profile']
            }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: {
              title: '高级详情页',
              permission: ['profile']
            }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: RouteView,
        redirect: '/result/success',
        meta: {
          title: '结果页',
          icon: 'check-circle-o',
          permission: ['result']
        },
        hideChildrenInMenu: true,
        children: [{
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: {
              title: '成功',
              keepAlive: false,
              hiddenHeaderContent: true,
              permission: ['result']
            }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: {
              title: '失败',
              keepAlive: false,
              hiddenHeaderContent: true,
              permission: ['result']
            }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: {
          title: '个人页',
          icon: 'user',
          hidden: true,
          keepAlive: true,
          permission: ['account']
        },
        hideChildrenInMenu: true,
        children: [{
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: {
              title: '个人中心',
              hidden: true,
              keepAlive: true,
              permission: ['account']
            }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: {
              title: '个人设置',
              hidden: true,
              hideHeader: true,
              permission: ['account']
            },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [{
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: {
                  title: '基本设置',
                  hidden: true,
                  permission: ['account']
                }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: '安全设置',
                  hidden: true,
                  keepAlive: true,
                  permission: ['account']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: {
                  title: '个性化设置',
                  hidden: true,
                  keepAlive: true,
                  permission: ['account']
                }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: {
                  title: '账户绑定',
                  hidden: true,
                  keepAlive: true,
                  permission: ['account']
                }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: '新消息通知',
                  hidden: true,
                  keepAlive: true,
                  permission: ['account']
                }
              }
            ]
          }
        ]
      }

    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
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
