<template>
  <page-header-wrapper>
    <a-card rowKey="tkey">
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <a slot="action" slot-scope="record" @click="() => confirm(record)">Confirm</a>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>
<script>
const columns = [
  {
    title: 'Account Name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
]
const data = [
  {
    tkey: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    tkey: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    tkey: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    tkey: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park'
  }
]

export default {
  data () {
    return {
      data,
      columns
    }
  },
  methods: {
    confirm (record) {
        console.log(record)
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        getCheckboxProps: record => ({
          props: {
            name: record.name
          }
        })
      }
    }
  }
}
</script>
