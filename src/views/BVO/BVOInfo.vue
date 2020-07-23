<template>
  <page-header-wrapper content="BVO information, welcome to use BSP!">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="userId"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            readOnly="true"
            v-decorator="[
              'userId',
              {rules: [{ required: true, message: '请输入id' }],
               initialValue: form1.userId}
            ]"
            name="userId"
            placeholder="please input id"
          />
        </a-form-item>
        <a-form-item
          label="name"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: 'please input name' }],
               initialValue: form1.name}
            ]"
            name="name"
            placeholder="please input name"
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
              {rules: [{ required: true, message: 'please input email' }],
               initialValue: form1.email}
            ]"
            name="email"
            placeholder="please input email"
          />
        </a-form-item>
        <a-form-item
          label="phone"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="please input phone number"
            v-decorator="[
              'phone',
              {rules: [{ required: true, message: 'please input phone number' }],
               initialValue: form1.phone}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="number"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'number',
              {rules: [{ required: false, message: 'please input fix phone number' }],
               initialValue: form1.number}
            ]"
            v-model="number"
            placeholder="please input fix phone number"
          />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary" @click="handleSubmit">save</a-button>
          <a-button style="margin-left: 8px" @click="handleCancel">cancel</a-button>
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
import { axios as request } from '@/utils/request'
import storage from 'store'

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
		form1: {
			userId: 0,
			name: '',
			email: '',
			phone: '',
			number: ''
		},
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
		var app = this
		var flag = false
      this.form.validateFields((err, values) => {
        if (!err) {
			flag = true
          console.log('Received values of form: ', values)
			app.form1 = values
        }
      })
		if (flag) {
			console.log(app.form1)
			app.saveBVOInfo()
		}
    },
	getBVOInfo () {
		var app = this
		console.log('hhh')
		request.post('/system/DsrDropshipperController/getBVOInfo',
		{
			'manBuyerId':	0,
			'userId':	storage.get('userId'),
			'username':	storage.get('username')
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
			var data = response.content
			app.form1.userId = data.userId
			app.form1.name = data.name
			app.form1.email = data.email
			app.form1.phone = data.phone
			app.form1.number = data.number
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
		var app = this
		// console.log(values)
		console.log(this.form1)
		request.post('/system/DsrDropshipperController/saveBVOInfo',
		{
			'SysUserDto': app.form1
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
			console.log(response)
			// if (response.success) {
			// 	app.$router.push('/dashboard/mvo-workplace')
			// }
			// app.$message.info(`Update Succeed`)
		})
		this.$message.success('update success')
	},
    handleCancel () {
      // this.$router.push('/dashboard/mvo-workplace')
			location.reload()
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
