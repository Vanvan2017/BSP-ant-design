<template>
	<!-- <div>MyStores</div> -->
	<a-result status="403" title="403" sub-title="Sorry, you don't have access to this page.">
		<template #extra>
			<a-button type="primary" @click="saveBVOInfo">
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
		name: 'MyStores',
		data () {
			return {
				sysUser: ''
			}
		},
		methods: {
			toHome () {
				this.$router.push({
					path: '/'
				})
			},
			getOnlineStores () {
				// var app = this
				console.log('hhh')
				request.post('StrStoreController/getOnlineStores', {
					'manBuyerId': 0,
					'userId': 3,
					'username': 'string'
				}).then(function (response) {
					console.log('sdsd')
					console.log(response)
					// var data = response.data.content
					// if (data) {
					// 	app.data.push({
					// 		manId: data.manId,
					// 		name_cn: data.nameCn,
					// 		name_en: data.nameEn,
					// 		type: data.gmcReportType,
					// 		certificate: data.gmcReportUrl,
					// 		description: data.description
					// 	})
					// 	app.MVOInfo = data
					// 	app.getBrandList()
					// }
				})
			},
			saveBVOInfo () {
				// var app = this
				request.post('StrStoreController/addOnlineStore', {
					'SysUserDto': {
						'userId': 3
					},
					'StrStoreDto': {
						'storeName': 'addias',
						'plataeformType': '2'
					},
					'token': 'ABS1234',
					'APPId': '1231',
					'key': '13243424'
				}).then(function (response) {
					console.log('sdsd')
					console.log(response)
					console.log(response.data)
					// if (response.data.success) {
					// 	app.$router.push('/dashboard/mvo-workplace')
					// }
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '~ant-design-vue/lib/style/themes/default.less';
</style>
