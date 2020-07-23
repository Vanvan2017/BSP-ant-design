<template>
  <a-modal title="Order Detail" :visible="visible" @ok="handleOKay" @cancel="handleCancel">
    <a-timeline mode="alternate">
      <a-timeline-item v-for="(item, i) in data" :key="i" color="green">{{ item.context }} {{ item.time }}</a-timeline-item>
    </a-timeline>
  </a-modal>
</template>

<script>
import { axios as request } from '@/utils/request'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      data: []
    }
  },
  created () {
    console.log('custom express detail created')
  },
  methods: {
    handleOKay () {
      this.data = []
      this.$emit('okay')
    },
    handleCancel () {
      this.data = []
      this.$emit('cancel')
    },
    getExpress () {
      var app = this
      request
        .post('/system/ExpressController/getState', {
          com: 'suning',
          nu: 'SN6600018167160'
        })
        .then(function (response) {
          console.log('=======ExpressDetail=====')
          console.log(response)
          response.showapi_res_body.data.forEach(item => {
            app.data.push(item)
            // console.log(item)
          })
        })
        console.log(app.data)
    }
    // getItemDetail (id) {
    //   var app = this
    //   request
    //     .post('/system/SalSalesOrderLineItemController/getSalSalesOrderLineItemControllerList', {
    //       saoId: id
    //     })
    //     .then(function (response) {
    //       console.log('sdsd')
    //       console.log(response)
    //       response.data.content.forEach(item => {
    //         var pro = item.proProductDto
    //         var sal = item.salSalesOrderLineItemDto
    //         app.data.push({
    //           proId: pro.proId,
    //           title: pro.title,
    //           price: sal.price,
    //           qty: sal.qty
    //         })
    //         console.log(app.data)
    //       })
    //     })
    // },
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
