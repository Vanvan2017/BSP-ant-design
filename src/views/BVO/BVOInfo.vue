<template>
  <page-header-wrapper content="BVO information, welcome to use BSP!">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="姓名"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入姓名' }]}
            ]"
            name="name"
            placeholder="请输入姓名"
          />
        </a-form-item>
        <a-form-item
          label="邮箱"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'email',
              {rules: [{ required: true, message: '请输入邮箱' }]}
            ]"
            v-model="email"
            placeholder="请输入邮箱"
          />
        </a-form-item>
        <a-form-item
          label="电话"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="请输入电话"
            v-decorator="[
              'phone',
              {rules: [{ required: true, message: '请输入电话' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="固话"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'number',
              {rules: [{ required: false, message: '请输入请输入固化号码' }]}
            ]"
            v-model="number"
            placeholder="请输入固话号码"
          />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary" @click="handleSubmit">保存</a-button>
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
// 动态切换组件
import List from '@/views/list/table/List'
import Edit from '@/views/list/table/Edit'
// import router from '../../router'
import axios from 'axios'

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
		// form: {
		// 	name: ''
		// },
      currentComponet: 'List',
      record: ''
    }
  },
  mounted () {
    this.getBVOInfo()
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$router.push('/dashboard/mvo-workplace')
        }
      })
    },
	getBVOInfo () {
		var app = this
		console.log('hhh')
		request.post('DsrDropshipperController/getBVOInfo',
		{
			'manBuyerId':	0,
			'userId':	3,
			'username':	'string'
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
			var data = response.data.content
			app.form.name = data.name
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
				'bz': 'null',
				'email': '12345123@163.com',
				'name': 'BBO',
				'number': '12345678',
				'phone': '12345678909',
				'userId': '3'
			}
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
			console.log(response.data)
			// if (response.data.success) {
			// 	app.$router.push('/dashboard/mvo-workplace')
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
