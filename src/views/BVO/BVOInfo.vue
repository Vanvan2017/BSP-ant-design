<template>
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
  name: 'BVOInfo',
  data () {
    return {
      sysUser: ''
    }
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    },
	getBVOInfo () {
		// var app = this
		console.log('hhh')
		request.post('DsrDropshipperController/getBVOInfo',
		{
			'manBuyerId':	0,
			'userId':	3,
			'username':	'string'
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
	saveBVOInfo	() {
		// var app = this
		request.post('DsrDropshipperController/saveBVOInfo',
		{
			'SysUserDto':	{
				'userId':	4,
				'name':	'???'
			}
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
