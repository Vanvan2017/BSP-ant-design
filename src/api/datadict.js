import request from '@/utils/request'

const api = {
  Role: '/system/role'
}

export default api

export function getRoleList (parameter) {
  return request({
    url: api.Role,
    method: 'post',
    params: parameter
  })
}
