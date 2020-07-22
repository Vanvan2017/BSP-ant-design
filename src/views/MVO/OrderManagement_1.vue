<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="handleTabChange"
  >
    <template v-slot:content>
      <div class="ant-pro-page-header-search">
        <a-input-search size="large" style="width: 80%; max-width: 522px;">
          <template v-slot:enterButton>搜索</template>
        </a-input-search>
      </div>
    </template>
    <router-view />
  </page-header-wrapper>
</template>

<script>
import { axios as request } from '@/utils/request'
// import storage from 'store'

const getActiveKey = path => {
  switch (path) {
    case '/mvo/order-management/unpaid':
      return '1'
    case '/mvo/order-management/unshipped':
      return '2'
    case '/mvo/order-management/shipped':
      return '3'
    case '/mvo/order-management/finished':
      return '4'
    case '/mvo/order-management/cancelled':
      return '5'
    default:
      return '1'
  }
}
export default {
  name: 'SearchLayout',
  data () {
    return {
      tabList: [
        { key: '1', tab: '待支付' },
        { key: '2', tab: '待发货' },
        { key: '3', tab: '已发货' },
        { key: '4', tab: '已完成' },
        { key: '5', tab: '已取消' }
      ],
      tabActiveKey: '1',
      search: true
    }
  },
  created () {
    this.tabActiveKey = getActiveKey(this.$route.path)

    this.$watch('$route', val => {
      this.tabActiveKey = getActiveKey(val.path)
    })
  },
  methods: {
    find () {
      console.log('weq')
      console.log(this.tabActiveKey)
    },
    handleTabChange (key) {
      // this.tabActiveKey = key
      // var app = this
      // var sts = ''
      // switch (key) {
      // 	case '1':
      // 		sts = 'AwaitingPayment'
      // 		break
      // 	case '2':
      // 		sts = 'AwaitingShipment'
      // 		break
      // 	case '3':
      // 		sts = 'SHIPPED'
      // 		break
      // 	case '4':
      // 		sts = 'Complete'
      // 		break
      // 	case '5':
      // 		sts = 'Canceled'
      // 		break
      // 	default:
      // 		sts = 'unknown'
      // }
      // request.post('/system/SaOSalesOrderController/getSaoSalesOrderList',
      // {
      // 	'SysUserDto': {
      // 		'manBuyerId':	0,
      // 		'userId':	storage.get('userId'),
      // 		'username':	storage.get('username')
      // 	},
      // 	'ORDER_STS': sts
      // }).then(function (response) {
      // 	console.log('sdsd')
      // 	console.log(response)
      // 			// var data = response.content
      // 			// if (data) {
      // 			// 	app.data.push({
      // 			// 		manId: data.manId,
      // 			// 		name_cn: data.nameCn,
      // 			// 		name_en: data.nameEn,
      // 			// 		type: data.gmcReportType,
      // 			// 		certificate: data.gmcReportUrl,
      // 			// 		description: data.description
      // 			// 	})
      // 			// 	app.MVOInfo = data
      // 			// 	app.getBrandList()
      // 			// }
      // 	if (key === '2') {
      // 		app.changeToShipment()
      // 	} else if (key === '3') {
      // 		app.getExpress()
      // 	}
      // })
      switch (key) {
        case '1':
          this.$router.push('/mvo/order-management/unpaid')
          break
        case '2':
          this.$router.push('/mvo/order-management/unshipped')
          break
        case '3':
          this.$router.push('/mvo/order-management/shipped')
          break
        case '4':
          this.$router.push('/mvo/order-management/finished')
          break
        case '5':
          this.$router.push('/mvo/order-management/cancelled')
          break
        default:
          this.$router.push('/home')
      }
    },
    changeToShipment () {
      request
        .post('/system/SaOSalesOrderController/changeToSHIPPED', {
          saoId: 2
        })
        .then(function (response) {
          console.log('sdsd')
          console.log(response)
        })
    },
    getExpress () {
      request
        .post('/system/ExpressController/getState', {
          com: 'suning',
          nu: 'SN6600018167160'
        })
        .then(function (response) {
          console.log('sdsd')
          console.log(response)
        })
    },
    getAddress () {
    },
    getItemDetail () {
      request
        .post('/system/SalSalesOrderLineItemController/getSalSalesOrderLineItemControllerList', {
          saoId: 1
        })
        .then(function (response) {
          console.log('sdsd')
          console.log(response)
        })
    }
    // handleTabChange (key) {
    //   this.tabActiveKey = key
    //   switch (key) {
    //     case '1':
    //       this.$router.push('/mvo/order-management/unpaid')
    //       break
    //     case '2':
    //       this.$router.push('/mvo/order-management/unshipped')
    //       break
    //     case '3':
    //       this.$router.push('/mvo/order-management/shipped')
    //       break
    //     case '4':
    //       this.$router.push('/mvo/order-management/finished')
    //       break
    //     case '5':
    //       this.$router.push('/mvo/order-management/cancelled')
    //       break
    //     default:
    //       this.$router.push('/home')
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}
</style>
