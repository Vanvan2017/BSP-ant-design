<template>
  <div>
    <a-table :data-source="data" :columns="columns" rowKey="saoId">
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >Search</a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">Reset</a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >{{ fragment }}</mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>{{ text }}</template>
      </template>
      <span slot="name" slot-scope="text, record">
        <a @click="() => track(record)">{{ text }}</a>
      </span>
      <span slot="action" slot-scope="record">
        <a @click="() => showModal(record)">Detail</a>
      </span>
    </a-table>
    <order-detail ref="order-detail" :visible="visi" @okay="handleOk" @cancel="handleCancel" />
    <express-detail
      ref="express-detail"
      :visible="visiExp"
      @okay="handleOkExp"
      @cancel="handleCancelExp"
    />
  </div>
</template>
<script>
import { axios as request } from '@/utils/request'
import OrderDetail from './OrderDetail'
import ExpressDetail from './ExpressDetail'

// const data = [
//   {
//     orderNo: 'AS12345',
//     productAmount: '32',
//     lastUpdateDate: '2020-07-20'
//   }
// ]
const fakeData = [
  {
    orderNo: 'AS12345',
    saoId: 1,
    productAmount: '32',
    lastUpdateDate: '2020-07-20',
    remark: 'AE0315'
  },
  {
    orderNo: 'AS12380',
    saoId: 2,
    productAmount: '321',
    lastUpdateDate: '2020-07-20',
    remark: 'AE0316'
  }
]

export default {
  components: {
    OrderDetail,
    ExpressDetail
  },
  data () {
    return {
      visi: false,
      visiExp: false,
      data: [],
      companyName: '?',
      fakeData,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      columns: [
        {
          title: 'Older No.',
          dataIndex: 'orderNo',
          key: 'orderNo',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.orderNo
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: 'Total Amount',
          dataIndex: 'productAmount',
          key: 'productAmount',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.productAmount
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Updated Time',
          dataIndex: 'lastUpdateDate',
          key: 'lastUpdateDate',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.lastUpdatedDate
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Created Time',
          dataIndex: 'creationDate',
          key: 'creationDate',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.creationDate
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Tracking No.',
          dataIndex: 'remark',
          key: 'remark',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'name'
          },
          onFilter: (value, record) =>
            record.remark
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  mounted () {
    console.log('AwaitingPayment')
    this.getShipped()
  },
  methods: {
    track (record) {
      this.getAddress()
      // console.log(record)
      console.log(record.remark)
      console.log(this.companyName)

      // 测试用的
      this.$refs['express-detail'].getExpress()
      // 传入参数用这个
      // this.$refs['express-detail'].getExpress(record.remark, this.companyName)
      this.visiExp = true
    },
    showModal (record) {
      console.log(record)
      this.$refs['order-detail'].getItemDetail(record.saoId)
      this.visi = true
    },
    handleOk () {
      this.visi = false
    },
    handleCancel () {
      this.visi = false
    },
    handleOkExp () {
      this.visiExp = false
    },
    handleCancelExp () {
      this.visiExp = false
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    getShipped () {
      var app = this
      request
        .post('/system/SaOSalesOrderController/getBVOOrderList', {
          SysUserDto: {
            manBuyerId: 0,
            userId: 4,
            username: 'string'
          },
          ORDER_STS: 'Complete'
        })
        .then(function (response) {
          console.log('sdsd')
          console.log(response)
			var list = []
          response.content.forEach(item => {
            // app.data.push(item)
			item.saoSalesOrderDtos.forEach(item1 => {
				console.log(item1)
				list.push(item1)
			})
          })
			console.log(list)
			list.forEach(item => {
				app.data.push(item)
			})
          // var data = response.content
          // if (data) {
          // 	app.data.push({
          // 		manId: data.manId,
          // 		name_cn: data.nameCn,
          // 		name_en: data.nameEn,
          // 		type: data.gmcReportType,
          // 		certificate: data.gmcReportUrl,
          // 		description: data.description
          // 	})
          // 	app.MVOInfo = data
          // 	app.getBrandList()
          // }
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
    },
    getAddress () {
      var app = this
      console.log('我是马焜啊啊啊啊啊啊我好帅啊！！')
      request
        .post('/system/AddressController/getAddress', {
          saoId: 1
        })
        .then(function (response) {
          console.log('=======Address========')
          console.log(response)
          app.companyName = response.content.carrierName
        })
    },
    cancel (record) {
      console.log(record.saoId)
    }
  }
}
</script>

<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
