<template>
  <a-modal title="Order Detail" :visible="visible" @ok="handleOKay" @cancel="handleCancel">
    <a-table :columns="columns" :data-source="data" rowKey="proId">
      <a slot="name" slot-scope="text, record" @click="() => showItemDetail(record)">{{ text }}</a>
    </a-table>
  </a-modal>
</template>

<script>
import { axios as request } from '@/utils/request'
// import storage from 'store'
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    scopedSlots: { customRender: 'name' }
  },
	{
		title: 'skuCd',
		dataIndex: 'skuCd',
		key: 'skuCd'
	},
	// {
	// 	title: 'ean',
	// 	dataIndex: 'ean',
	// 	key: 'ean'
	// },
	// {
	// 	title: 'upc',
	// 	dataIndex: 'upc',
	// 	key: 'upc'
	// },
  {
		title: 'Price',
		dataIndex: 'price',
		key: 'price'
  },
  {
		title: 'Quantity',
		dataIndex: 'qty',
		key: 'qty'
  }
]
// const data = [
//   {
//     proId: '1',
//     title: 'John Brown',
//     price: 32,
//     qty: 100
//   }
// ]
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
    // saoId: {
    //     type: Number,
    //     required: true
    // }
  },
  data () {
    return {
      data: [],
      columns
    }
  },
  created () {
    console.log('custom modal created')
  },
  mounted () {
    //   console.log('=====Mounted=======')
    //   var saoId = this.getSaoId
    //   this.getItemDetail(this.saoId)
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
    // getSaoId () {
    //     this.$emit('id')
    // },
    showItemDetail (title) {
      console.log(title)
    },
    getItemDetail (id) {
      var app = this
      request
        .post('/system/SalSalesOrderLineItemController/getSalSalesOrderLineItemControllerList', {
          saoId: id
        })
        .then(function (response) {
          console.log('sdsd')
          console.log(response)
          response.content.forEach(item => {
            var pro = item.proProductDto
            var sal = item.salSalesOrderLineItemDto
            app.data.push({
              proId: pro.proId,
              title: pro.title,
				ean: pro.ean,
				skuCd: pro.skuCd,
				upc: pro.upc,
              price: sal.price,
              qty: sal.qty
            })
            console.log(app.data)
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
