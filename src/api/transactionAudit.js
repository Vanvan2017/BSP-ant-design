import request from '@/utils/request'

const api = {
  GetTransactionAudit: '/system/transactionAudit/list'
}

export default api

export function getTransactionAuditList (parameter) {
  return request({
    url: api.GetTransactionAudit,
    method: 'post',
    params: parameter
  })
}
