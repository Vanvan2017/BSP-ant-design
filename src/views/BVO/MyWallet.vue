<script>
/* eslint-disable */
</script>
<template>
  <page-header-wrapper>
    <a-card>
      <div>
        <a-table :data-source="data" :pagination="false">
          <a-table-column key="name" title="Name" data-index="name" style="color: #1890ff" />
          <a-table-column key="age" title="Age" data-index="age" />
          <a-table-column key="address" title="Address" data-index="address" />
          <a-table-column key="action" title="Action">
            <template slot-scope="text, record">
              <a @click="handleClick(record.key)">Deposit</a>
            </template>
          </a-table-column>
        </a-table>
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
  </page-header-wrapper>
</template>

<script>
import axios from 'axios'

const data = [
  {
    key: '1',
    name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

export default {
  name: 'MyWallet',
  data () {
    return {
      data
    }
  },
  mounted () {
    this.getAccountData()
  },
  methods: {
    handleClick () {
      var _this = this
      axios
        .post('http://localhost:9000/system/wallet/deposit', {
          accountName: 'ZZJ',
          password: '987654321',
          depositingMoney: '666',
          currency: 'USD'
        })
        .then(function (response) {
          console.log(response)
          if (response.data.success === true) {
            _this.$message.info(`Deposit Submitted`)
          } else {
            _this.$message.error(`Deposit Failed`)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    changePassword () {
      var _this = this
      axios
        .post('http://localhost:9000/system/wallet/changepwd', {
          accountName: 'LSKReno3',
          old_password: '987654321',
          new_password: '123456789'
        })
        .then(function (response) {
          console.log(response)
          if (response.data.success === true) {
            _this.$message.info(`Change Succeed`)
          } else {
            _this.$message.error(`Change Failed`)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getAccountData () {
      var _this = this
      axios
        .post('http://localhost:9000/system/wallet/querylist', {
          accountName: 'LSKReno3'
        })
        .then(function (response) {
          console.log(response)
          if (response.data.success === true) {
            _this.data = response.data.content.list
          } else {
            // 该用户没有注册过钱包，显示注册页面
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    record () {
      var _this = this
      axios
        .post('http://localhost:9000/system/wallet/queryrecord', {
          accountName: 'ZZJ',
          page: 0,
          size: 10
        })
        .then(function (response) {
          console.log(response)
          if (response.data.success === true) {
            // response.data.content.list
          } else {
            _this.$message.error(`No Record Found`)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }

  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
