<template>
  <div>
    <!-- fakeData测试用，连后端用data -->
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
      <span slot="action" slot-scope="record">
        <a @click="() => ship(record)">Ship</a>
        <a-divider type="vertical" />
        <a @click="() => showModal(record)">Detail</a>
      </span>
    </a-table>
    <order-detail ref="order-detail" :visible="visi" @okay="handleOk" @cancel="handleCancel" />
  </div>
</template>

<script>
import OrderDetail from './OrderDetail'
import { axios as request } from '@/utils/request'
import storage from 'store'

const fakeData = [
  {
    orderNo: 'AS12345',
    saoId: 1,
    productAmount: '32',
    lastUpdateDate: '2020-07-20'
  },
  {
    orderNo: 'AS12380',
    saoId: 2,
    productAmount: '321',
    lastUpdateDate: '2020-07-20'
  }
]
export default {
  components: {
    OrderDetail
  },
  data () {
    return {
      visi: false,
      data: [],
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
            record.lastUpdateDate
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
          title: 'Payment Time',
          dataIndex: 'paymentDate',
          key: 'paymentDate',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.paymentDate
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
    this.getAwaitingShippment()
  },
  methods: {
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
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    getAwaitingShippment () {
      var app = this
      request
        .post('/system/SaOSalesOrderController/getSaoSalesOrderList', {
          SysUserDto: {
            manBuyerId: 0,
            userId: storage.get('userId'),
            username: storage.get('username')
          },
          ORDER_STS: 'AwaitingShipment'
        })
        .then(function (response) {
			console.log(response)
          response.content.forEach(item => {
            app.data.push(item)
          })
        })
    },
    ship (record) {
      console.log(record)
      console.log(record.saoId)
      this.changeToShipment(record.saoId)
    },
    changeToShipment (sao) {
		var app = this
      request
        .post('/system/SaOSalesOrderController/changeToSHIPPED', {
          saoId: sao
        })
        .then(function (response) {
			app.$message.success('shipped success')
			window.location.reload()
          console.log('shipped!!!')
        })
    },
    getItemDetail (values) {
      request
        .post('/system/SalSalesOrderLineItemController/getSalSalesOrderLineItemControllerList', {
          saoId: values
        })
        .then(function (response) {})
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
