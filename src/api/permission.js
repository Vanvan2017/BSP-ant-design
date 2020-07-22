import request from '@/utils/request'

const api = {
  Role: '/system/role',
  UpdateRole: '/system/role/update',
  UpdatePermission: '/system/permission/update'
}

export default api

export function getRoleList (parameter) {
  return request({
    url: api.Role,
    method: 'post',
    params: parameter
  })
}

export function updateRole (parameter) {
  return request({
    url: api.UpdateRole,
    method: 'post',
    params: parameter
  })
}

export function updatePermission (parameter) {
  return request({
    url: api.UpdatePermission,
    method: 'post',
    params: parameter,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
