<script>/* eslint-disable */</script>
<template>
  <div>
  <a-row>
    <a-col :span="8">
      <a-input-search
          placeholder="input search title"
          enter-button="Search"
          @search="onSearch"/>
     </a-col>
    <a-col :span="18"></a-col>
  </a-row>
<br /><br />
<!-- 	<a-button type="primary" icon="sync">
	      Pull Orders
	    </a-button>
	<br /><br /> -->
    <a-tabs type="card" default-active-key="1" @change="callback">
		
		<!-- awaiting payments!!!!!!!!! -->
      <a-tab-pane key="1" tab="Awaiting Payment">
         <a-table :columns="AwaitingPaymentColumns" :data-source="AwaitingPaymentTableData">
             <a slot="name" slot-scope="text">{{ text }}</a>
             <a slot="column" slot-scope="text">Pay Now</a>
           </a-table>
      </a-tab-pane>
	  
	  <!-- awaiting shipments!!!!!!!!! -->
      <a-tab-pane key="2" tab="Awaiting Shipment" force-render>
          <a-table :columns="AwaitingShipmentColumns" :data-source="AwaitingShipmentTableData">
              <a slot="name" slot-scope="text">{{ text }}</a>
            </a-table>
      </a-tab-pane>
	  
	  
	  
      <a-tab-pane key="3" tab="Shipped">
        <a-table :columns="ShippedColumns" :data-source="ShippedTableData">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <a slot="tracking" slot-scope="text">{{ text }}</a>
          </a-table>
      </a-tab-pane>
	  
	  
	  
	  <a-tab-pane key="4" tab="Completed Orders">
        <a-table :columns="CompletedColumns" :data-source="CompletedTableData">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <a slot="tracking" slot-scope="text">{{ text }}</a>
          </a-table>
	  </a-tab-pane>
	  <a-tab-pane key="5" tab="Cancelled Orders">
        <a-table :columns="CancelledColumns" :data-source="CancelledTableData">
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
	  </a-tab-pane>
	  <a-button slot="tabBarExtraContent" type="primary" icon="sync">
	        Pull Orders
	  </a-button>
    </a-tabs>
  </div>
</template>

<script>
  const AwaitingPaymentColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      customRender: (text) => '$' + text
    },
    {
      title: 'QTY ',
      dataIndex: 'qty',
      key: 'qty',
      ellipsis: true,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      ellipsis: true,
      
    },
    {
      title: 'Order No',
      dataIndex: 'orderno',
      key: 'order-no',
      ellipsis: true,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      ellipsis: true,
      customRender: (text) => '$' + text
    },
    {
      title: '',
      dataIndex: 'pay',
      key: 'pay',
      ellipsis: true,
      scopedSlots: { customRender: 'column' },
    },
  ];
  const AwaitingPaymentTableData = [
  {
    key: '1',
    title: 'John Brown',
    price: 32,
    qty: '114514',
    sku: '1919810',
    orderno: '113331',
    total: '13131'
  },
  {
    key: '2',
    title: 'Jim Green',
    price: 42,
    qty: '114514',
    sku: '1919810',
    orderno: '113331',
    total: '13131'
  },
  {
    key: '3',
    title: 'Joe Black',
    price: 32,
    qty: '114514',
    sku: '1919810',
    orderno: '113331',
    total: '13131'
  },
];

const AwaitingShipmentColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      customRender: (text) => '$' + text
    },
    {
      title: 'QTY ',
      dataIndex: 'qty',
      key: 'qty',
      ellipsis: true,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      ellipsis: true,
      
    },
    {
      title: 'Order No',
      dataIndex: 'orderno',
      key: 'order-no',
      ellipsis: true,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      ellipsis: true,
      customRender: (text) => '$' + text
    }
  ];
  
  const AwaitingShipmentTableData = [
    {
      key: '1',
      title: 'John Brown',
      price: 32,
      qty: '114514',
      sku: '1919810',
      orderno: '113331',
      total: '13131'
    },
    {
      key: '2',
      title: 'Jim Green',
      price: 42,
      qty: '114514',
      sku: '1919810',
      orderno: '113331',
      total: '13131'
    },
    {
      key: '3',
      title: 'Joe Black',
      price: 32,
      qty: '114514',
      sku: '1919810',
      orderno: '113331',
      total: '13131'
    },
  ];
  
  const ShippedColumns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        scopedSlots: { customRender: 'name' },
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        customRender: (text) => '$' + text
      },
      {
        title: 'QTY ',
        dataIndex: 'qty',
        key: 'qty',
        ellipsis: true,
      },
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        ellipsis: true,
        
      },
      {
        title: 'Order No',
        dataIndex: 'orderno',
        key: 'order-no',
        ellipsis: true,
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        ellipsis: true,
        customRender: (text) => '$' + text
      },
      {
        title: 'Tracking No',
        dataIndex: 'trackingNo',
        key: 'trackingNo',
        ellipsis: true,
        scopedSlots: { customRender: 'tracking' },
      },
    ];
    
    const ShippedTableData = [
      {
        key: '1',
        title: 'John Brown',
        price: 32,
        qty: '114514',
        sku: '1919810',
        orderno: '113331',
        total: '13131',
        trackingNo: '222222222',
      },
      {
        key: '2',
        title: 'Jim Green',
        price: 42,
        qty: '114514',
        sku: '1919810',
        orderno: '113331',
        total: '13131',
        trackingNo: '22222',
      },
      {
        key: '3',
        title: 'Joe Black',
        price: 32,
        qty: '114514',
        sku: '1919810',
        orderno: '113331',
        total: '13131',
        trackingNo: '22222',
      },
    ];
    
    const CompletedColumns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          customRender: (text) => '$' + text
        },
        {
          title: 'QTY ',
          dataIndex: 'qty',
          key: 'qty',
          ellipsis: true,
        },
        {
          title: 'SKU',
          dataIndex: 'sku',
          key: 'sku',
          ellipsis: true,
          
        },
        {
          title: 'Order No',
          dataIndex: 'orderno',
          key: 'order-no',
          ellipsis: true,
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
          ellipsis: true,
          customRender: (text) => '$' + text
        },
        {
          title: 'Tracking No',
          dataIndex: 'trackingNo',
          key: 'trackingNo',
          ellipsis: true,
          scopedSlots: { customRender: 'tracking' },
        },
      ];
      
      const CompletedTableData = [
        {
          key: '1',
          title: 'John Brown',
          price: 32,
          qty: '114514',
          sku: '1919810',
          orderno: '113331',
          total: '13131',
          trackingNo: '222222222',
        },
        {
          key: '2',
          title: 'Jim Green',
          price: 42,
          qty: '114514',
          sku: '1919810',
          orderno: '113331',
          total: '13131',
          trackingNo: '22222',
        },
        {
          key: '3',
          title: 'Joe Black',
          price: 32,
          qty: '114514',
          sku: '1919810',
          orderno: '113331',
          total: '13131',
          trackingNo: '22222',
        },
      ];
      
  const CancelledColumns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        scopedSlots: { customRender: 'name' },
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        customRender: (text) => '$' + text
      },
      {
        title: 'QTY ',
        dataIndex: 'qty',
        key: 'qty',
        ellipsis: true,
      },
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        ellipsis: true,
        
      },
      {
        title: 'Order No',
        dataIndex: 'orderno',
        key: 'order-no',
        ellipsis: true,
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        ellipsis: true,
        customRender: (text) => '$' + text
      }
    ];
    
    const CancelledTableData = [
      {
        key: '1',
        title: 'John Brown',
        price: 32,
        qty: '114514',
        sku: '1919810',
        orderno: '113331',
        total: '13131'
      },
      {
        key: '2',
        title: 'Jim Green',
        price: 42,
        qty: '114514',
        sku: '1919810',
        orderno: '113331',
        total: '13131'
      },
      {
        key: '3',
        title: 'Joe Black',
        price: 32,
        qty: '114514',
        sku: '1919810',
        orderno: '113331',
        total: '13131'
      },
    ];
export default {
  
  data() {
    return {
    AwaitingPaymentColumns,
		AwaitingPaymentTableData,
    AwaitingShipmentColumns,
    AwaitingShipmentTableData,
    ShippedColumns,
    ShippedTableData,
    CompletedColumns,
    CompletedTableData,
    CancelledColumns,
    CancelledTableData,
    
		multipleSelection: [],
	};
  name: 'MyStores';
  },
  computed: {
    
  },
  methods: {
	onSearch()
	{
		  
	},
	handleAwaitingPaymentTitleClick(row)
	{
		
	},
	handleAwaitingShipmentTitleClick(row)
	{
		
	},
	handleShippedTitleClick(row)
	{
		
	},
	handleShippedTrackingClick(row)
	{
		
	},
	handleCompletedTitleClick(row)
	{
		
	},
	handleCompletedTrackingClick(row)
	{
		
	},
    callback(key) {
      console.log(key);
    },
	toggleSelection(rows) {
	        if (rows) {
	          rows.forEach(row => {
	            this.$refs.multipleTable.toggleRowSelection(row);
	          });
	        } else {
	          this.$refs.multipleTable.clearSelection();
	        }
	      },
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	      }
  },
};
</script>


<style lang="less" scoped>

@import '~ant-design-vue/lib/style/themes/default.less';
</style>
