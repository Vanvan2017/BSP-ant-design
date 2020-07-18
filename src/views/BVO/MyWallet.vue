<script>/* eslint-disable */</script>
<template>
  <div>
  	  <a-table :data-source="data" :pagination="false">
  		<a-table-column key="name" title="Name"data-index="name" style="color: #1890ff"/>
  		<a-table-column key="age" title="Age" data-index="age" />
  		<a-table-column key="address" title="Address" data-index="address" />
  		<a-table-column key="action" title="Action">
  		  <template slot-scope="text, record">
  			  <a @click="handleClick(record.key)">Deposit</a>
  		  </template>
  		</a-table-column>
  	  </a-table>
  	  <br/><br/>
  	  <a-row>
  			<a-col :span="8">
  			</a-col>
  			<a-col :span="2">
  			  <a-button type="primary" @click="changePassword()">Change Password</a-button>
  			</a-col>
  			<a-col :span="1"></a-col>
  			<a-col :span="2">
  			  <a-button type="primary" @click="record()">Record</a-button>
  			</a-col>
  			<a-col :span="8"></a-col>
  	  </a-row>
    </div>
</template>

<script>
  const data = [
    {
      key: '1',
      name: 'John',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  
export default {
    name: 'MyStores',
    data() {
        return {
          data,
        };
      },
      methods:
      {
    	  handleClick(e)
    	  {
    		  console.log(e);
    	  }
      }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
