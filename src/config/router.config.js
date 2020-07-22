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

export const asyncRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: {
    title: 'menu.home'
  },
  redirect: '/dashboard/workplace',
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
        permission: ['dashboard']
      },
      children: [{
          path: '/dashboard/workplace',
          name: 'Workplace',
          component: () => import('@/views/dashboard/Workplace'),
          meta: {
            title: 'Workplace',
            keepAlive: false
          }
        },
        {
          path: '/dashboard/analysis',
          name: 'Analysis',
          component: () => import('@/views/dashboard/Analysis'),
          meta: {
            title: 'menu.dashboard.analysis',
            keepAlive: false,
            permission: ['dashboard']
          }
        }
      ]
    },

    // BVO
    {
      path: '/bvo',
      name: 'BVO',
      redirect: '/bvo/bvo-info',
      component: RouteView,
      meta: {
        title: 'BVO',
        keepAlive: true,
        icon: 'form',
        permission: ['dashboard']
      },
      children: [{
          path: '/bvo/bvo-info',
          name: 'BVOInfo',
          component: () => import('@/views/BVO/BVOInfo'),
          meta: {
            title: 'BVO-Info',
            keepAlive: false
          }
        },
        {
          path: '/bvo/my-stores',
          name: 'MyStores',
          component: () => import('@/views/BVO/MyStores'),
          meta: {
            title: 'MyStores',
            keepAlive: false
          }
        },
        {
          path: '/bvo/items-list',
          name: 'ItemsList',
          component: () => import('@/views/BVO/ItemsList'),
          meta: {
            title: 'ItemsList',
            keepAlive: false
          }
        },
        {
          path: '/bvo/wishlist',
          name: 'WishList',
          component: () => import('@/views/BVO/WishList'),
          meta: {
            title: 'WishList',
            keepAlive: false
          }
        },
        {
          path: '/bvo/my-orders',
          name: 'MyOrders',
          component: () => import('@/views/BVO/MyOrders'),
          // hideChildrenInMenu: true,
          meta: {
            title: 'MyOrders',
            keepAlive: true
          },
          children: [{
              path: '/bvo/my-orders/unpaid',
              name: 'Unpaid',
              component: () => import('@/views/BVO/orders/AwaitingPayment'),
              meta: {
                title: 'Unpaid',
                keepAlive: false
              }
            },
            {
              path: '/bvo/my-orders/unshipped',
              name: 'Unshipped',
              component: () => import('@/views/BVO/orders/AwaitingShippment'),
              meta: {
                title: 'Unshipped',
                keepAlive: false
              }
            },
            {
              path: '/bvo/my-orders/shipped',
              name: 'Shipped',
              component: () => import('@/views/BVO/orders/Shipped'),
              meta: {
                title: 'Shipped',
                keepAlive: false
              }
            },
            {
              path: '/bvo/my-orders/finished',
              name: 'Finished',
              component: () => import('@/views/BVO/orders/Finished'),
              meta: {
                title: 'Finished',
                keepAlive: false
              }
            },
            {
              path: '/bvo/my-orders/cancelled',
              name: 'Cancelled',
              component: () => import('@/views/BVO/orders/Cancelled'),
              meta: {
                title: 'Cancelled',
                keepAlive: false
              }
            },
            {
              path: '/bvo/my-orders/pay',
              name: 'PayNow',
              hidden: true,
              component: () => import('@/views/BVO/orders/pay/PayNow'),
              meta: {
                title: 'Pay Now',
                keepAlive: true
              }
            }
          ]
        },
        {
          path: '/bvo/my-wallet',
          name: 'BVO-MyWallet',
          component: () => import('@/views/BVO/MyWallet'),
          meta: {
            title: 'BVO-MyWallet',
            keepAlive: false,
            hideChildrenInMenu: true
          },
          children: [{
              path: '/bvo/my-wallet/register',
              name: 'BVO-MyWallet-Register',
              component: () => import('@/views/BVO/WalletRegister'),
              meta: {
                title: 'Wallet Regitster',
                keepAlive: true
              }
            },
            {
              path: '/bvo/my-wallet/record',
              name: 'BVO-Wallet-Record',
              component: () => import('@/views/BVO/WalletRecord'),
              meta: {
                title: 'Wallet Record',
                keepAlive: true
              }
            }
          ]
        }
      ]
    },

    // MVO
    {
      path: '/mvo',
      name: 'MVO',
      redirect: '/mvo/mvo-info',
      component: RouteView,
      meta: {
        title: 'MVO',
        keepAlive: true,
        icon: 'table'
      },
      children: [{
          path: '/mvo/mvo-info',
          name: 'MVOInfo',
          component: () => import('@/views/MVO/MVOInfo'),
          meta: {
            title: 'MVO-Info',
            keepAlive: true
          }
        },
        {
          path: '/mvo/add-items',
          name: 'AddItems',
          component: () => import('@/views/MVO/AddItems'),
          meta: {
            title: 'AddItems',
            keepAlive: false
          }
        },
        {
          path: '/mvo/items-category',
          name: 'ItemsCategory',
          component: () => import('@/views/MVO/ItemsCategory'),
          meta: {
            title: 'ItemsCategory',
            keepAlive: false
          }
        },
        {
          path: '/mvo/order-management',
          name: 'OrderManagement',
          redirect: '/mvo/order-management/unpaid',
          component: () => import('@/views/MVO/OrderManagement'),
          meta: {
            title: 'OrderManagement',
            keepAlive: false
          },
          children: [{
              path: '/mvo/order-management/unpaid',
              name: 'MVOUnpaid',
              component: () => import('@/views/MVO/orders/AwaitingPayment'),
              meta: {
                title: 'Unpaid',
                keepAlive: false
              }
            },
            {
              path: '/mvo/order-management/unshipped',
              name: 'MVOUnshipped',
              component: () => import('@/views/MVO/orders/AwaitingShippment'),
              meta: {
                title: 'Unshipped',
                keepAlive: false
              }
            },
            {
              path: '/mvo/order-management/shipped',
              name: 'MVOShipped',
              component: () => import('@/views/MVO/orders/Shipped'),
              meta: {
                title: 'Shipped',
                keepAlive: false
              }
            },
            {
              path: '/mvo/order-management/finished',
              name: 'MVOFinished',
              component: () => import('@/views/MVO/orders/Finished'),
              meta: {
                title: 'Finished',
                keepAlive: false
              }
            },
            {
              path: '/mvo/order-management/cancelled',
              name: 'MVOCancelled',
              component: () => import('@/views/MVO/orders/Cancelled'),
              meta: {
                title: 'Cancelled',
                keepAlive: false
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
            hideChildrenInMenu: true
          },
          children: [{
              path: '/mvo/my-wallet/register',
              name: 'MVO-Wallet-Register',
              component: () => import('@/views/MVO/WalletRegister'),
              meta: {
                title: 'Wallet Register',
                keepAlive: false,
                hidden: true
              }
            },
            {
              path: '/mvo/my-wallet/record',
              name: 'MVO-Wallet-Record',
              component: () => import('@/views/MVO/WalletRecord'),
              meta: {
                title: 'Wallet Record',
                keepAlive: false
              }
            }
          ]
        }
      ]
    },
    // GVO
    {
      path: '/gvo',
      name: 'GVO',
      redirect: '/gvo/gvo-info',
      component: RouteView,
      meta: {
        title: 'GVO',
        keepAlive: true,
        icon: 'table'
      },
      children: [{
          path: '/gvo/data-dict',
          name: 'DataDict',
          component: () => import('@/views/GVO/DataDict'),
          meta: {
            title: 'DataDict',
            keepAlive: false
          }
        },
        {
          path: '/gvo/para-management',
          name: 'ParameterManagement',
          component: () => import('@/views/GVO/ParameterManagement'),
          meta: {
            title: 'ParameterManagement',
            keepAlive: false
          }
        },
        {
          path: '/gvo/check-bill',
          name: 'CheckBill',
          component: () => import('@/views/GVO/CheckBill'),
          meta: {
            title: 'CheckBill',
            keepAlive: false
          }
        },
        {
          path: '/gvo/perm-management',
          name: 'PermissionManagement',
          component: () => import('@/views/GVO/PermissionManagement'),
          meta: {
            title: 'PermissionManagement',
            keepAlive: false
          }
        }
      ]
    },

    // Exception
    {
      path: '/exception',
      name: 'exception',
      component: RouteView,
      redirect: '/exception/403',
      hidden: true,
      meta: {
        title: '异常页',
        icon: 'warning',
        permission: ['exception']
      },
      children: [{
          path: '/exception/403',
          name: 'Exception403',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
          meta: {
            title: '403',
            permission: ['exception']
          }
        },
        {
          path: '/exception/404',
          name: 'Exception404',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
          meta: {
            title: '404',
            permission: ['exception']
          }
        },
        {
          path: '/exception/500',
          name: 'Exception500',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
          meta: {
            title: '500',
            permission: ['exception']
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
      hidden: true,
      meta: {
        title: '个人页',
        icon: 'user',
        keepAlive: true,
        permission: ['user']
      },
      children: [{
          path: '/account/center',
          name: 'center',
          component: () => import('@/views/account/center'),
          meta: {
            title: '个人中心',
            keepAlive: true,
            permission: ['user']
          }
        },
        {
          path: '/account/settings',
          name: 'settings',
          component: () => import('@/views/account/settings/Index'),
          meta: {
            title: '个人设置',
            hideHeader: true,
            permission: ['user']
          },
          redirect: '/account/settings/base',
          hideChildrenInMenu: true,
          children: [{
              path: '/account/settings/base',
              name: 'BaseSettings',
              component: () => import('@/views/account/settings/BaseSetting'),
              meta: {
                title: '基本设置',
                permission: ['user']
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
                permission: ['user']
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
                permission: ['user']
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
                permission: ['user']
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
                permission: ['user']
              }
            }
          ]
        }
      ]
    }

  ]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}]

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
