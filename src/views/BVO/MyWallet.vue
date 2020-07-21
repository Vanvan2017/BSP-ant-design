<script>
/* eslint-disable */
</script>
<template>
  <page-header-wrapper>
    <a-card>
      <div>
        <a-row>
          <a-col :span="8">
            <h3>Account Name</h3>
          </a-col>
          <a-col :span="8">
            <h3>Available Money</h3>
          </a-col>
          <a-col :span="8">
            <h3>Operation</h3>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <p>account name here</p>
          </a-col>
          <a-col :span="8">
            <p>{{data.availableMoney}}</p>
          </a-col>
          <a-col :span="8">
            <a-button type="link" @click="deposit()">Deposit</a-button>
          </a-col>
        </a-row>

        <br />
        <br />
        <a-row>
          <a-col :span="8"></a-col>
          <a-col :span="2">
            <a-button type="primary" @click="changePassword()">Change Password</a-button>
          </a-col>
          <a-col :span="4"></a-col>
          <a-col :span="2">
            <a-button type="primary" @click="record()">Record</a-button>
          </a-col>
          <a-col :span="8"></a-col>
        </a-row>
      </div>
    </a-card>
    <a-modal v-model="PwdVisible" title="Change Password" @ok="handleOk1">
      <a-form :form="form1">
        <a-form-item label="Old password">
          <a-input-password
            size="large"
            placeholder="Old password"
            name="oldPwd"
            v-decorator="[
                'oldPwd',
                {rules: [{ required: true, message: 'Enter your old password' }], validateTrigger: 'blur'}
              ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input-password>
        </a-form-item>
        <a-form-item label="New password">
          <a-input-password
            size="large"
            name="newPwd"
            placeholder="New password"
            v-decorator="[
                'newPwd',
                {rules: [{ required: true, message: 'Set a new password' }], validateTrigger: 'blur'}
              ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input-password>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model="DepositVisible" title="Deposit" @ok="handleOk2">
      <a-form :form="form2">
        <a-form-item
          label="Amount ($)"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'amount',
              {rules: [{ required: true, message: 'Please input amount' }]}
            ]"
            name="amount"
            placeholder="Please input amount"
          />
        </a-form-item>
        <a-form-item
          label="Password"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input-password
            name="password"
            placeholder="Password here"
            v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Please enter password' }], validateTrigger: 'blur'}
              ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input-password>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-header-wrapper>
</template>


<script>
import axios from 'axios'

export default {
  name: 'MyWallet',
  data() {
    return {
      data: '',
      PwdVisible: false,
      DepositVisible: false,
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this)
    }
  },
  mounted() {
    this.getAccountData()
  },
  methods: {
    deposit() {
      this.DepositVisible = true
    },
    changePassword() {
      this.PwdVisible = true
    },
    handleOk1() {
      var _this = this
      this.form1.validateFields((err, values) => {
        if (!err) {
          axios
            .post('http://localhost:9000/system/wallet/changepwd', {
              accountName: 'LSKReno3',
              old_password: values.oldPwd,
              new_password: values.newPwd
            })
            .then(function(response) {
              console.log(response)
              if (response.data.success === true) {
                _this.$message.info(`Change Succeed`)
                _this.form1.resetFields()
                _this.PwdVisible = false
              } else {
                _this.$message.error(`Change Failed`)
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      })
    },
    handleOk2() {
      var _this = this
      this.form2.validateFields((err, values) => {
        if (!err) {
          axios
            .post('http://localhost:9000/system/wallet/deposit', {
              accountName: 'LSKReno3',
              password: values.password,
              depositingMoney: values.amount,
              currency: 'USD'
            })
            .then(function(response) {
              console.log(response)
              if (response.data.success === true) {
                _this.$message.info(`Deposit Submitted`)
                _this.form2.resetFields()
                _this.DepositVisible = false
              } else {
                _this.$message.error(response.data.message)
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      })
    },
    getAccountData() {
      var _this = this
      axios
        .post('http://localhost:9000/system/wallet/querylist', {
          accountName: 'LSKReno3'
        })
        .then(function(response) {
          console.log(response)
          if (response.data.success === true) {
            _this.data = response.data.content
          } else {
            // 该用户没有注册过钱包，显示注册页面
            _this.$message.error(`Please register at first!`)
            _this.$router.push('bvo/my-wallet/register')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    record() {
      this.$router.push('bvo/my-wallet/record')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
