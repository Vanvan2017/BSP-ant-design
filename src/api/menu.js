import request from '@/utils/request'

const api = {
  menu: '/system/auth/menu'
}

export default api

export function getMenuList (parameter) {
  return request({
    url: api.menu,
    method: 'post',
    params: parameter
  })
}
