<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
	<a-form-item
		label="CountryName"
		:labelCol="labelCol"
		:wrapperCol="wrapperCol"
      >
		<a-input
			disabled = "true"
			v-decorator="['countryName', { initialValue: form1.countryName}]"/>
	</a-form-item>
	<a-form-item
		label="cityName"
		:labelCol="labelCol"
		:wrapperCol="wrapperCol"
		>
		<a-input
			disabled = "true"
			v-decorator="['cityName', { initialValue: form1.cityName}]"/>
	</a-form-item>
	<a-form-item
		label="addressLine1"
		:labelCol="labelCol"
		:wrapperCol="wrapperCol"
		>
		<a-input
			disabled = "true"
			v-decorator="['addressLine1', { initialValue: form1.addressLine1}]"/>
	</a-form-item>
	<a-form-item
		label="addressLine2"
		:labelCol="labelCol"
		:wrapperCol="wrapperCol"
		>
		<a-input
			disabled = "true"
			v-decorator="['addressLine2', { initialValue: form1.addressLine2}]"/>
	</a-form-item>
	<a-form-item
		label="addressLine3"
		:labelCol="labelCol"
		:wrapperCol="wrapperCol"
		>
		<a-input
			disabled = "true"
			v-decorator="['addressLine3', { initialValue: form1.addressLine3}]"/>
	</a-form-item>
	<a-form-item
		label="postalCd"
		:labelCol="labelCol"
		:wrapperCol="wrapperCol"
		>
		<a-input
			disabled = "true"
			v-decorator="['postalCd', { initialValue: form1.postalCd}]"/>
	</a-form-item>
	<a-form-item
		label="contactPhoneNo"
		:labelCol="labelCol"
		:wrapperCol="wrapperCol"
		>
		<a-input
			disabled = "true"
			v-decorator="['contactPhoneNo', { initialValue: form1.contactPhoneNo}]"/>
	</a-form-item>
	<a-form-item
		label="carrierName"
		:labelCol="labelCol"
		:wrapperCol="wrapperCol"
		>
		<a-input
			disabled = "true"
			v-decorator="['carrierName', { initialValue: form1.carrierName}]"/>
	</a-form-item>
	<a-form-item
		label="productAmount"
		:labelCol="labelCol"
		:wrapperCol="wrapperCol"
		>
		<a-input
			disabled = "true"
			v-decorator="['productAmount', { initialValue: record.productAmount}]"/>
	</a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">Next</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
<!--    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>转账到支付宝账户</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
      <h4>转账到银行卡</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
    </div> -->
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
  name: 'Step1',
  data () {
    return {
		labelCol: { lg: { span: 5 }, sm: { span: 5 } },
		wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
		form: this.$form.createForm(this),
		form1: [],
		record: []
    }
  },
  methods: {
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
			console.log(values)
			this.$emit('nextStep')
        }
      })
    },
	getAddress () {
		var app = this
		// console.log('我是马焜啊啊啊啊啊啊我好帅啊！！')
		app.record = JSON.parse(sessionStorage.getItem('record'))
		sessionStorage.removeItem('record')
		request
			.post('AddressController/getAddress', {
			saoId: app.record.saoId
		})
		.then(function (response) {
			console.log('=======Address========')
			console.log(response)
			app.form1 = response.data.content
			// app.companyName = response.data.content.carrierName
		})
	}
  },
  mounted () {
	this.getAddress()
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
