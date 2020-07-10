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
// 动态切换组件
import List from '@/views/list/table/List'
import Edit from '@/views/list/table/Edit'
// import router from '../../router'

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
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$router.push('/dashboard/mvo-workplace')
        }
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
