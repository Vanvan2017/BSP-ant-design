<template>
  <page-header-wrapper content="BVO information, welcome to use BSP!">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="Account Name"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: 'Please enter account name' }],
               initialValue: form1.name}
            ]"
            name="name"
            placeholder="Please enter account name"
          />
        </a-form-item>
        <a-form-item
          label="E-mail"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'email',
              {rules: [{ required: true, message: 'Please enter e-mail' }],
               initialValue: form1.email}
            ]"
            name="email"
            placeholder="Please enter e-mail"
          />
        </a-form-item>
        <a-form-item>
          <a-input-password
            size="large"
            placeholder="Set password"
            v-decorator="[
              'password',
              {rules: [{ required: true, message: 'Please set a password' }], validateTrigger: 'blur'}
            ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input-password>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary" @click="handleSubmit">Register</a-button>
          <a-button style="margin-left: 8px" @click="handleCancel">Reset</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import ATextarea from 'ant-design-vue/es/input/TextArea'
import AInput from 'ant-design-vue/es/input/Input'
// 动态切换组件
import List from '@/views/list/table/List'
import Edit from '@/views/list/table/Edit'

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
      form: this.$form.createForm(this)
    }
  },

  methods: {
    // handler
    handleSubmit () {
      var _this = this
      request
        .post('/system/wallet/register', {
          accountName: storage.get('username'),
          email: this.form.email,
          password: this.form.password
        })
        .then(function (response) {
          console.log(response)
          if (response.success === true) {
            // 跳转页面
          } else {
            _this.$message.error(`Register Failed`)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleCancel () {
      this.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
