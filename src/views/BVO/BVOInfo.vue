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
            placeholder="请输入id"
          />
        </a-form-item>
        <a-form-item
          label="姓名"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入姓名' }],
               initialValue: form1.name}
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
              {rules: [{ required: true, message: '请输入邮箱' }],
               initialValue: form1.email}
            ]"
            name="email"
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
              {rules: [{ required: true, message: '请输入电话' }],
               initialValue: form1.phone}
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
              {rules: [{ required: false, message: '请输入请输入固化号码' }],
               initialValue: form1.number}
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
