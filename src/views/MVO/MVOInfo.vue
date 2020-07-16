<template>
  <page-header-wrapper content="MVO information, welcome to use BSP!">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="公司中文名称（中文）"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'name-cn',
              {rules: [{ required: true, message: '请输入名称（中文）' }]}
            ]"
            name="name-cn"
            placeholder="请输入公司中文名称（中文）"
          />
        </a-form-item>
        <a-form-item
          label="公司英文名称（English）"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'name-en',
              {rules: [{ required: true, message: '请输入英文名称（English）' }]}
            ]"
            name="name-en"
            placeholder="请输入公司名称（English）"
          />
        </a-form-item>
        <a-form-item
          label="公司简介"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-textarea
            rows="4"
            placeholder="请输入你的公司简介"
            v-decorator="[
              'description',
              {rules: [{ required: true, message: '请输入公司简介' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="品牌商认证类型"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="请输入认证类型"
            v-decorator="[
              'type',
              {rules: [{ required: true, message: '请输入认证类型' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="证书地址"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="请输入证书地址"
            v-decorator="[
              'certificate',
              {rules: [{ required: true, message: '请输入证书地址' }]}
            ]"
          />
        </a-form-item>

        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary">保存</a-button>
          <a-button style="margin-left: 8px" @click="handleCancel">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <!-- <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <component @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
    </a-card> -->
  </page-header-wrapper>
</template>

<script>

import ATextarea from 'ant-design-vue/es/input/TextArea'
import AInput from 'ant-design-vue/es/input/Input'
import axios from 'axios'
// 动态切换组件
import List from '@/views/list/table/List'
import Edit from '@/views/list/table/Edit'
// import router from '../../router'
const request = axios.create({ // eslint-disable-line no-unused-vars
  // API 请求的默认前缀
  baseURL: 'http://localhost:9000/system/',
  timeout: 6000 // 请求超时时间
})
export default {
  name: 'BaseForm',
  components: {
    AInput,
    ATextarea,
    List,
    Edit
  },
  data () {
    return {
      form: this.$form.createForm(this),
      currentComponet: 'List',
      record: ''
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
		var app = this
		e.preventDefault()
		console.log(this.form)
		this.form.validateFields((err, values) => {
        if (!err) {
			console.log('Received values of form: ', values)
			console.log(values['name-en'])
			var manManufacturerDto = {
				'nameEn':	values['name-en'],
				'nameCn':	values['name-cn'],
				'gmcReportType':	values.type,
				'description':	values.description,
				'gmcReportUrl':	values.certificate
			}
			console.log(manManufacturerDto)
			request.post('CompanyInformationController/saveCompanyInfo',
			{
				'SysUserDto':	{
					'manBuyerId':	0,
					'userId':	4,
					'username':	'string'
				},
				'ManManufacturerDto':	manManufacturerDto

			}).then(function (response) {
				console.log('sdsd')
				console.log(response)
				if (response.data.success) {
					app.$router.push('/dashboard/mvo-workplace')
				}
			})
        }
      })
    },
	getMVOInfo () {
		// var app = this
		console.log('hhh')
		request.post('CompanyInformationController/getCompanyInfo',
		{
			'manBuyerId':	0,
			'userId':	4,
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
    handleCancel () {
      this.$router.push('/dashboard/mvo-workplace')
    },
    handleEdit (record) {
      this.record = record || ''
      this.currentComponet = 'Edit'
      console.log(record)
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
	getForm () {
		var app = this
		console.log('hhh')
		request.post('CompanyInformationController/getCompanyInfo',
		{
			'manBuyerId':	0,
			'userId':	4,
			'username':	'string'
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
			var data = response.data.content
			if (data) {
				app.data.push({
					name_cn: data.nameCn,
					name_en: data.nameEn,
					type: data.gmcReportType,
					certificate: data.gmcReportUrl,
					description: data.description
				})
			}
		})
	}
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
