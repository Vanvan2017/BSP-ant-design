<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-alert
        :closable="true"
        message="please confirm whether you want to pay for"
        style="margin-bottom: 24px;"
			/>
			<a-form-item
				label="支付密码"
				:labelCol="labelCol"
				:wrapperCol="wrapperCol"
				class="stepFormText"
			>
				<a-input
					type="password"
					style="width: 80%;"
					v-decorator="['paymentPassword', { initialValue: '123456', rules: [{required: true, message: '请输入支付密码'}] }]" />
			</a-form-item>
			<a-form-item :wrapperCol="{span: 19, offset: 5}">
				<a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
				<a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
			</a-form-item>
		</a-form>
  </div>
</template>

<script>
import axios from 'axios'

const request = axios.create({
  // eslint-disable-line no-unused-vars
  // API 请求的默认前缀
  baseURL: 'http://localhost:9000/system/',
  timeout: 6000 // 请求超时时间
})
export default {
  name: 'Step2',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0
    }
  },
  methods: {
    nextStep () {
		const that = this
		const { form: { validateFields } } = this
		// that.loading = true
		var record = JSON.parse(sessionStorage.getItem('record'))
		validateFields((err, values) => {
			if (!err) {
				request.post('wallerController/pay',
				{
					'SysUserDto': {
						'userId':	3
					},
					'password': values.paymentPassword,
					'SaoSalesOrderDto': {
						'saoId': record.saoId
					}
				}).then(function (response) {
					console.log('sdsd')
					console.log(response)
				})
			} else {
				that.loading = false
			}
      })
    },
    prevStep () {
      this.$emit('prevStep')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

</style>
