<script>
/* eslint-disable */
</script>
<template>
  <div>
    <page-header-wrapper>
      <a-card>
        <div>
          <a-row>
            <a-col :span="4">
              <h3>Account Name</h3>
            </a-col>
            <a-col :span="4">
              <h3>Available Money</h3>
            </a-col>
            <a-col :span="4">
              <h3>Depositing Money</h3>
            </a-col>
            <a-col :span="4">
              <h3>WithdrawingMoney</h3>
            </a-col>
            <a-col :span="8">
              <h3>Operation</h3>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="4">
              <p>{{data.createBy}}</p>
            </a-col>
            <a-col :span="4">
              <p>{{data.availableMoney}}</p>
            </a-col>
            <a-col :span="4">
              <p>{{data.depositingMoney}}</p>
            </a-col>
            <a-col :span="4">
              <p>{{data.withdrawingMoney}}</p>
            </a-col>
            <a-col :span="8">
              <a-button type="link" @click="withdraw()">Withdraw</a-button>
              <!-- <a-button type="link" @click="DepositVisible = true">deposit</a-button> -->
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
      <a-modal v-model="WithdrawVisible" title="Withdraw" @ok="handleOk2">
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
    <a-modal v-model="visible" :footer="null">
      <a-form :form="form3">
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
    </a-modal>
    <a-modal v-model="visible1" :footer="null" @cancel="reload()">
      <a-table :columns="columns" :data-source="data">
        <a slot="transactionNumber" slot-scope="text">{{ text}}</a>
        <p slot="transactionMoney" slot-scope="text">$ {{ text }}</p>
        <p slot="createTime" slot-scope="text">{{ text }}</p>
      </a-table>
    </a-modal>
    <a-modal v-model="DepositVisible" title="Deposit" @ok="deposit()">
      <a-form :form="form5">
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
  </div>
</template>


<script>
import ATextarea from 'ant-design-vue/es/input/TextArea'
import AInput from 'ant-design-vue/es/input/Input'
// 动态切换组件
import List from '@/views/list/table/List'
import Edit from '@/views/list/table/Edit'
import { axios as request } from '@/utils/request'
import storage from 'store'

const columns = [
  {
    title: 'Serial Number',
    dataIndex: 'transactionNumber',
    key: 'transactionNumber',
    scopedSlots: { customRender: 'transactionNumber' },
  },
  {
    title: 'Amount',
    dataIndex: 'transactionMoney',
    key: 'transactionMoney',
    scopedSlots: { customRender: 'transactionMoney' },
  },
  {
    title: 'Time',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
]
export default {
  name: 'MyWallet',
  components: {
    AInput,
    ATextarea,
    List,
    Edit,
  },
  data() {
    return {
      visible: false,
      visible1: false,
      DepositVisible: false,
      data: '',
      PwdVisible: false,
      WithdrawVisible: false,
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      form3: this.$form.createForm(this),
      form4: this.$form.createForm(this),
      form5: this.$form.createForm(this),
      columns,
    }
  },
  mounted() {
    this.getAccountData()
  },
  methods: {
    withdraw() {
      this.WithdrawVisible = true
    },
    changePassword() {
      this.PwdVisible = true
    },
    handleOk1() {
      var _this = this
      this.form1.validateFields((err, values) => {
        if (!err) {
          request
            .post('/system/wallet/changepwd', {
              accountName: storage.get('username'),
              old_password: values.oldPwd,
              new_password: values.newPwd,
            })
            .then(function (response) {
              console.log(response)
              if (response.success === true) {
                _this.$message.info(`Change Succeed`)
                _this.form1.resetFields()
                _this.PwdVisible = false
              } else {
                _this.$message.error(`Change Failed`)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
    },
    handleOk2() {
      var _this = this
      this.form2.validateFields((err, values) => {
        if (!err) {
          request
            .post('/system/wallet/withdraw', {
              accountName: storage.get('username'),
              password: values.password,
              withdrawingMoney: values.amount,
              currency: 'USD',
            })
            .then(function (response) {
              console.log(response)
              if (response.success === true) {
                _this.$message.info(`Withdraw Submitted`)
                _this.form2.resetFields()
                _this.WithdrawVisible = false
              } else {
                _this.$message.error(response.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
    },
    getAccountData() {
      var _this = this
      request
        .post('/system/wallet/querylist', {
          accountName: storage.get('username'),
        })
        .then(function (response) {
          console.log(response)
          if (response.success === true) {
            _this.data = response.content
          } else {
            // 该用户没有注册过钱包，显示注册页面
            _this.$message.error('Please register at first!')
            _this.visible = true
            // this.$router.push({ path: '/mvo/my-wallet/register' })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    record() {
      // this.$router.push('/mvo/my-wallet/record')
      this.visible1 = true
      var _this = this
      request
        .post('/system/wallet/queryrecord', {
          accountName: storage.get('username'),
          page: 0,
          size: 10,
        })
        .then(function (response) {
          console.log(response)
          if (response.success === true) {
            _this.data = response.content.list
            for (let item of _this.data) {
              let tmp = new Date(item.createTime)
              item.createTime = tmp.toLocaleString('chinese', { hour12: false })
              if (item.status == 2) {
                item.status = 'Applying'
              } else if (item.status == 4) {
                item.status = 'Completed'
              } else if (item.status == 1) {
                item.status = 'Failed'
              }
            }
          } else {
            _this.$message.error(`No Record Found`)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    reload(){
      this.visible1=false
      this.getAccountData()
    },
    handleSubmit() {
      var _this = this
      this.form3.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          request
            .post('/system/wallet/register', {
              accountName: storage.get('username'),
              email: values.email,
              password: values.password,
            })
            .then(function (response) {
              console.log(response)
              if (response.success === true) {
                // 跳转页面
                _this.getAccountData()
                _this.visible = false
              } else {
                _this.$message.error(`Register Failed`)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
    },
    handleCancel() {
      this.form3.resetFields()
    },
    deposit() {
      var _this = this
      this.form5.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          request
            .post('/system/wallet/deposit', {
              accountName: storage.get('username'),
              password: values.password,
              depositingMoney: values.amount,
              currency: 'USD',
            })
            .then(function (response) {
              console.log(response)
              if (response.success === true) {
                _this.$message.info(`Deposit Submitted`)
                _this.form5.resetFields()
                _this.DepositVisible = false
              } else {
                _this.$message.error(response.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
