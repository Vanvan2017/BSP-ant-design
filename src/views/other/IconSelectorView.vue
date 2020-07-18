<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <icon-selector v-model="currentSelectedIcon" @change="handleIconChange"/>

    <a-divider />
    <p>测试 IconSelector 组件 v-model 功能</p>
    <a-button @click="getParameterList">改变 Icon-down</a-button>
    <a-divider type="vertical" />
    <a-button @click="removeParameter">改变 Icon-cloud-download</a-button>
  </a-card>
</template>

<script>
import IconSelector from '@/components/IconSelector'
import axios from 'axios'

const request = axios.create({ // eslint-disable-line no-unused-vars
  // API 请求的默认前缀
  baseURL: 'http://localhost:9000/system/',
  timeout: 6000 // 请求超时时间
})
export default {
  name: 'IconSelectorView',
  components: {
    IconSelector
  },
  data () {
    return {
      currentSelectedIcon: 'pause-circle'
    }
  },
  methods: {
    handleIconChange (icon) {
      console.log('change Icon', icon)
      this.$message.info(<span>选中图标 <code>{icon}</code></span>)
    },
    changeIcon (type) {
      this.currentSelectedIcon = type
    },
	getcdmList () {
		request.post('CodeMasterController/getCdmList',
		{
			'userId':	3,
			'rights':	1
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
		})
	},
	addCdm () {
		request.post('CodeMasterController/saveCdm',
		{
			'CdmCodeMasterDto': {
				'codeType': 'string',
				'codeVal': 'string',
				'description': 'testCase',
				'remark': 'string',
				'typeCd': 'string'
			},
			'SysUserDto': {
				'userId':	3
			}
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
		})
	},
	removeCdm () {
		request.post('CodeMasterController/removeCdm',
		{
			'cdmId': '3'
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
		})
	},
	getParameterList () {
		request.post('parameterController/getParameterList',
		{
			'userId':	3,
			'rights':	1
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
		})
	},
	saveParameter () {
		request.post('parameterController/saveParameter',
		{
			'ParParameterDto': {
				'description': 'string',
				'paramCd': 'string',
				'paramValue': 'string',
				'remark': 'stringtest'
			},
			'SysUserDto': {
				'userId':	3
			}
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
		})
	},
	removeParameter () {
		request.post('parameterController/removeParameter',
		{
			'parId': '3'
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
		})
	}
  }
}
</script>
