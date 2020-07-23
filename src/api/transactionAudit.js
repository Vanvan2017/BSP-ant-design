import request from '@/utils/request'

const api = {
  GetTransactionAudit: '/system/transactionAudit/list',
  PassTransactionAudit: '/system/transactionAudit/pass',
  FailTransactionAudit: '/system/transactionAudit/fail'
}

export default api

export function getTransactionAuditList (parameter) {
  return request({
    url: api.GetTransactionAudit,
    method: 'post',
    params: parameter
  })
}

export function passTransactionAudit (parameter) {
  return request({
    url: api.PassTransactionAudit,
    method: 'post',
    params: parameter
  })
}

export function failTransactionAudit (parameter) {
  return request({
    url: api.FailTransactionAudit,
    method: 'post',
    params: parameter
  })
}
