<script>/*eslint-disable*/</script>
<template>
  <a-table :columns="columns" :data-source="data">
    <a slot="transactionNumber" slot-scope="text">{{ text}}</a>
    <p slot="transactionMoney" slot-scope="text">$ {{ text }}</p>
    <p slot="createTime" slot-scope="text">{{ text }}</p>
    </a-table>
</template>

<script>
import {axios as request} from '@/utils/request'
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
  }
];

// const data = [
//   {
//     key: '1',
//     serial: '1321431351',
//     balance: '787888',
//     time: '2020-07-20 09:12:11',
//     status: 'operating'
//   },
//   {
//     key: '2',
//     serial: '1321431351',
//     balance: '787888',
//     time: '2020-07-20 09:12:11',
//     status: 'operating'
//   },
//   {
//     key: '3',
//     serial: '1321431351',
//     balance: '787888',
//     time: '2020-07-20 09:12:11',
//     status: 'operating'
//   },
// ]
export default {
  name: 'BaseForm',
  components: {
   
  },
  data () {
    return {
      data:[],
      columns,
    }
  },
  mounted(){
    this.record()
  },
  methods: {
     record() {
      var _this = this
      request
        .post('/system/wallet/queryrecord', {
          accountName: storage.get('username'),
          page: 0,
          size: 10
        })
        .then(function(response) {
          console.log(response)
          if (response.success === true) {
            _this.data = response.content.list
            for(let item of _this.data){
              let tmp=new Date(item.createTime)
              item.createTime=tmp.toLocaleString('chinese',{hour12:false})
              if(item.status==2){
                item.status='Applying'
              }else if(item.status==4){
                item.status='Completed'
              }else if(item.status==1){
                item.status='Failed'
              }
            }
          } else {
            _this.$message.error(`No Record Found`)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
 }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
