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
              'nameCn',
              {rules: [{ required: true, message: '请输入名称（中文）' }],
               initialValue: form1.nameCn}
            ]"
            name="nameCn"
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
              'nameEn',
              {rules: [{ required: true, message: '请输入英文名称（English）' }],
               initialValue: form1.nameEn}
            ]"
            name="nameEn"
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
              {rules: [{ required: true, message: '请输入公司简介' }],
               initialValue: form1.description}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="品牌商认证类型"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <!--         <a-input
            placeholder="请输入认证类型"
            v-decorator="[
              'gmcReportType',
              {rules: [{ required: true, message: '请输入认证类型' }],
				initialValue: form1.gmcReportType}
            ]"
          />-->
          <a-radio-group v-decorator="['gmcReportType', { initialValue: form1.gmcReportType}]">
            <a-radio :value="1">TUV</a-radio>
            <a-radio :value="2">UL</a-radio>
          </a-radio-group>
          <!-- 			<a-form-model-item label="Activity type">
						<a-checkbox-group v-model="form.gmcReportType">
							<a-checkbox value="1" name="type">
								TUV
							</a-checkbox>
							<a-checkbox value="2" name="type">
								UL
							</a-checkbox>
						</a-checkbox-group>
					</a-form-model-item>
          </a-form-model-item>-->
        </a-form-item>
        <a-form-item
          label="证书地址"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="请输入证书地址"
            v-decorator="[
              'gmcReportUrl',
              {rules: [{ required: true, message: '请输入证书地址' }],
               initialValue: form1.gmcReportUrl}
            ]"
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
    </a-card>-->
  </page-header-wrapper>
</template>

<script>
import ATextarea from 'ant-design-vue/es/input/TextArea'
import AInput from 'ant-design-vue/es/input/Input'

import { axios as request } from '@/utils/request'
import storage from 'store'
// 动态切换组件
import List from '@/views/list/table/List'
import Edit from '@/views/list/table/Edit'

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
      record: '',
      form1: {
        nameCn: '',
        nameEn: '',
        manId: '',
        description: '',
        gmcReportType: 1,
        gmcReportUrl: ''
      }
    }
  },
  mounted () {
    this.getMVOInfo()
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
            nameEn: values['nameEn'],
            nameCn: values['nameCn'],
            gmcReportType: values.gmcReportType,
            description: values.description,
            gmcReportUrl: values.gmcReportUrl
          }
          console.log(manManufacturerDto)
          request
            .post('/system/CompanyInformationController/saveCompanyInfo', {
              SysUserDto: {
                manBuyerId: 0,
                userId: storage.get('userId'),
                username: storage.get('username')
              },
              ManManufacturerDto: manManufacturerDto
            })
            .then(function (response) {
              console.log('sdsd')
              console.log(response)
              if (response.success) {
                app.$router.push('/dashboard/workplace')
              }
            })
        } else {
					app.$message.warning('please fill in the blank with red star', 5)
				}
      })
    },
    getMVOInfo () {
      var app = this
      request
        .post('/system/CompanyInformationController/getCompanyInfo', {
          manBuyerId: 0,
          userId: storage.get('userId'),
          username: storage.get('username')
        })
        .then(function (response) {
          console.log('sdsd')
          console.log(response)
          app.form1 = response.content
          if (response.content.gmcReportType === '1') {
            app.form1.gmcReportType = 1
          } else if (response.content.gmcReportType === '2') {
            app.form1.gmcReportType = 2
          } else {
            app.form1.gmcReportType = 1
          }
          // var data = response.content
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
      this.$router.push('/dashboard/workplace')
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
      request
        .post('/system/CompanyInformationController/getCompanyInfo', {
          manBuyerId: 0,
          userId: storage.get('userId'),
          username: storage.get('username')
        })
        .then(function (response) {
          console.log('sdsd')
          console.log(response)
          var data = response.content
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
