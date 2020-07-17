<template>
  <!-- <div>MyOrders</div> -->
  <a-result status="403" title="403" sub-title="Sorry, you don't have access to this page.">
    <template #extra>
      <a-button type="primary" @click="Pay">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script>
import axios from 'axios'

const request = axios.create({ // eslint-disable-line no-unused-vars
  // API 请求的默认前缀
  baseURL: 'http://localhost:9000/system/',
  timeout: 6000 // 请求超时时间
})
export default {
    name: 'MyOrders',
	methods: {
		getExpress () {
			request.post('SaOSalesOrderController/getBVOOrderList',
			{
				'SysUserDto': {
					'manBuyerId':	0,
					'userId':	3,
					'username':	'string'
				},
				'ORDER_STS': 'AwaitingPayment'
			}).then(function (response) {
				console.log('sdsd')
				console.log(response)
			})
		},
		getItemDetail () {
			request.post('SalSalesOrderLineItemController/getSalSalesOrderLineItemControllerList',
			{
				'saoId': 2
			}).then(function (response) {
				console.log('sdsd')
				console.log(response)
			})
		},
		getAddress () {
			request.post('AddressController/getAddress',
			{
				'saoId': 1
			}).then(function (response) {
				console.log('sdsd')
				console.log(response)
			})
		},
		Pay () {
			request.post('wallerController/pay',
			{
				'SysUserDto': {
					'manBuyerId':	0,
					'userId':	3,
					'username':	'string'
				},
				'password': 12345,
				'SaoSalesOrderDto': {
					'saoId': 1
				}
			}).then(function (response) {
				console.log('sdsd')
				console.log(response)
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
