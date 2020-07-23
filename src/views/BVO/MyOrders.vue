<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="handleTabChange"
  >
    <a-card>
      <router-view />
    </a-card>
  </page-header-wrapper>
</template>

<script>
// const getActiveKey = (path) => {
//   switch (path) {
//     case '/mvo/order-management/unpaid':
//       return '1'
//     case '/mvo/order-management/unshipped':
//       return '2'
//     case '/mvo/order-management/shipped':
//       return '3'
//     case '/mvo/order-management/finished':
//       return '4'
//     case '/mvo/order-management/cancelled':
//       return '5'
//     default:
//       return '1'
//   }
// }
// export default {
//   name: 'SearchLayout',
//   data () {
//     return {
//       tabList: [
//         { key: '1', tab: '待支付' },
//         { key: '2', tab: '待发货' },
//         { key: '3', tab: '已发货' },
//         { key: '4', tab: '已完成' },
//         { key: '5', tab: '已取消' }
//       ],
//       tabActiveKey: '1',
//       search: true
//     }
//   },
//   created () {
//     this.tabActiveKey = getActiveKey(this.$route.path)

//     this.$watch('$route', (val) => {
//       this.tabActiveKey = getActiveKey(val.path)
//     })
//   },
//   methods: {
//     handleTabChange (key) {
//       this.tabActiveKey = key
//       switch (key) {
//         case '1':
//           this.$router.push('/mvo/order-management/unpaid')
//           break
//         case '2':
//           this.$router.push('/mvo/order-management/unshipped')
//           break
//         case '3':
//           this.$router.push('/mvo/order-management/shipped')
//           break
//         case '4':
//           this.$router.push('/mvo/order-management/finished')
//           break
//         case '5':
//           this.$router.push('/mvo/order-management/cancelled')
//           break
//         default:
//           this.$router.push('/home')
//       }
//     }
//   }
// }
import { axios as request } from '@/utils/request'

const getActiveKey = path => {
  switch (path) {
    case '/bvo/my-orders/unpaid':
      return '1'
    case '/bvo/my-orders/unshipped':
      return '2'
    case '/bvo/my-orders/shipped':
      return '3'
    case '/bvo/my-orders/finished':
      return '4'
    case '/bvo/my-orders/cancelled':
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
        { key: '1', tab: 'unpaid' },
        { key: '2', tab: 'unshipped' },
        { key: '3', tab: 'shipped' },
        { key: '4', tab: 'finished' },
        { key: '5', tab: 'cancelled' }
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
      this.tabActiveKey = key

      switch (key) {
        case '1':
          this.$router.push('/bvo/my-orders/unpaid')
          break
        case '2':
          this.$router.push('/bvo/my-orders/unshipped')
          break
        case '3':
          this.$router.push('/bvo/my-orders/shipped')
          break
        case '4':
          this.$router.push('/bvo/my-orders/finished')
          break
        case '5':
          this.$router.push('/bvo/my-orders/cancelled')
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
