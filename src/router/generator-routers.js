import * as loginService from '@/api/login'
import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,

  'MVOWorkplace': () => import('@/views/dashboard/MVOWorkplace'),
  'Analysis': () => import('@/views/dashboard/Analysis'),

  'BVOInfo': () => import('@/views/BVO/BVOInfo'),
  'MyStores': () => import('@/views/BVO/MyStores'),
  'ItemsList': () => import('@/views/BVO/ItemsList'),

  'WishList': () => import('@/views/BVO/WishList'),
  'MyOrders': () => import('@/views/BVO/MyOrders'),
  'BVOMyWallet': () => import('@/views/BVO/MyWallet'),

  'MVOInfo': () => import('@/views/MVO/MVOInfo'),
  'AddItems': () => import('@/views/MVO/AddItems'),
  'ItemsCategory': () => import('@/views/MVO/ItemsCategory'),

  'OrderManagement': () => import('@/views/MVO/OrderManagement'),
  'Unpaid': () => import('@/views/MVO/table/List'),
  'Unshipped': () => import('@/views/MVO/table/List'),
  'Shipped': () => import('@/views/MVO/table/List'),
  'Finished': () => import('@/views/MVO/table/List'),
  'Cancelled': () => import('@/views/MVO/table/List'),
  'MVOMyWallet': () => import('@/views/MVO/MyWallet'),

  // 你需要动态引入的页面组件
  'Workplace': () => import('@/views/dashboard/Workplace'),
  // 'Analysis': () => import('@/views/dashboard/Analysis'),

  // 'ProfileBasic': () => import('@/views/profile/basic/Index'),
  'ProfileAdvanced': () => import('@/views/profile/advanced/Advanced'),

  // result
  'ResultSuccess': () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
  'ResultFail': () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),

  // exception
  'Exception403': () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
  'Exception404': () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  'Exception500': () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),

  // account
  'AccountSettings': () => import('@/views/account/settings/Index'),
  'BaseSettings': () => import('@/views/account/settings/BaseSetting'),
  'SecuritySettings': () => import('@/views/account/settings/Security'),
  'CustomSettings': () => import('@/views/account/settings/Custom'),
  'BindingSettings': () => import('@/views/account/settings/Binding'),
  'NotificationSettings': () => import('@/views/account/settings/Notification'),

  'TestWork': () => import(/* webpackChunkName: "TestWork" */ '@/views/dashboard/TestWork')
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '/',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: '首页'
  },
  children: []
}

/**
 * 动态生成菜单
 * @param roleId
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (roleId) => {
  console.log('roleIdroleIdroleId')
  console.log(roleId)
  return new Promise((resolve, reject) => {
    loginService.getCurrentUserNav(roleId).then(res => {
      console.log('我在getCurrentUserNavgetCurrentUserNavgetCurrentUserNavgetCurrentUserNav')
      console.log('res', res)
      const { content } = res
      const menuNav = []
      const childrenNav = []
      //      后端数据, 根级树数组,  根级 PID
      listToTree(content, childrenNav, 0)

      rootRouter.children = childrenNav

      menuNav.push(rootRouter)
      console.log('menuNav', menuNav)

      const routers = generator(menuNav)
      routers.push(notFoundRouter)

      console.log('routers', routers)

      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon, keepAlive } = item.meta || {}
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      title: item.title || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: (constantRouterComponents[item.component || item.key]) || (() => import(`@/views/${item.component}`)),

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        keepAlive: keepAlive || false
        // permission: item.name
      }
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      console.log('进来了进来了进来了')
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
