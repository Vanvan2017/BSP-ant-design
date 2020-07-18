<script>/* eslint-disable */</script>
<template>
  <div>
  	<a-row>
  	      <a-col :span="2">
  	       
  	      </a-col>
  	      <a-col :span="20">
  	        <a-table :columns="columns" :data-source="data1" :pagination="false">
  	          <a slot="name" slot-scope="text">{{ text }}</a>
  	        </a-table>
  	      </a-col>
  	      <a-col :span="2">
  	       
  	      </a-col>
  	</a-row>
  	<br/><br/>
  	<a-row>
  	      <a-col :span="2">
  	       
  	      </a-col>
  	      <a-col :span="20">
  	        <a-table :columns="columns1" :data-source="data2" :pagination="false">
  	          <a slot="name" slot-scope="text">{{ text }}</a>
  	        </a-table>
  	      </a-col>
  	      <a-col :span="2">
  	       
  	      </a-col>
  	</a-row>
  	<br/><br/>
  	<a-row>
  	      <a-col :span="11">
  	      </a-col>
  	      <a-col :span="2">
  	        <a-button type="primary" @click="addStore()">Add a new store</a-button>
  	      </a-col>
  	      <a-col :span="8">
  	       
  	      </a-col>
  	</a-row>
    
    
    
    <a-modal v-model="visible" title="Add new store" on-ok="handleOk" >
          <template slot="footer">
            <a-row>
                  <a-col :span="7">
                    
                  </a-col>
                  <a-col :span="2">
                    <a-button key="back" @click="handleCancel">
                      Return
                    </a-button>
                  </a-col>
                  <a-col :span="5">
                   
                  </a-col>
                  <a-col :span="2">
                    <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                      Submit
                    </a-button>
                  </a-col>
                  <a-col :span="8">
                   
                  </a-col>
            </a-row>
            
            
          </template>
          <a-row>
                <a-col :span="6">
                  Company
                </a-col>
                <a-col :span="2">
                  <a-select default-value="Amazon" style="width: 180px">
                        <a-select-option value="Amazon">
                          Amazon
                        </a-select-option>
                        <a-select-option value="Ebay">
                          Ebay
                        </a-select-option>
                  </a-select>
                </a-col>
          </a-row>

          <br/>
          Store Name
          <a-input placeholder="Please input Store Name" /><br/><br/>
          Seller ID
          <a-input placeholder="Please input Seller ID" /><br/><br/>
          Marketplace ID
          <a-input placeholder="Please input Marketplace ID" /><br/><br/>
          MWS Auth Token
          <a-input placeholder="Please input MWS Auth Token" /><br/><br/>
        </a-modal>
    
    </div>
</template>

<script>
  const columns = [
    {
      title: 'Amazon',
      dataIndex: 'name',
      key: 'name',
  
    },
  ];
  const columns1 = [
    {
      title: 'Ebay',
      dataIndex: 'name',
      key: 'name',
  
    },
  ];
  const data1 = [
    {
      key: '1',
      name: 'Store 001',
  
    },
    {
      key: '2',
      name: 'Store 002',
  
    },
    {
      key: '3',
      name: 'Store 003',
  
    },
  ];
  const data2 = [
    {
      key: '1',
      name: 'Store 001',
   
    },
    {
      key: '2',
      name: 'Store 002',
  
    },
    {
      key: '3',
      name: 'Store 003',
    },
  ];
  
export default {
    name: 'MyStores',
    data() {
        return {
          data1,
          data2,
          columns,
          columns1,
          loading: false,
          visible: false,
        };
      },
      methods: {
            handleOk(e) {
              this.loading = true;
              setTimeout(() => {
                this.visible = false;
                this.loading = false;
              }, 3000);
            },
            handleCancel(e) {
              this.visible = false;
            },
        addStore() {
      	  this.visible = true;
        },
      },
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
