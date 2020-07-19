<<<<<<< Updated upstream
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
=======
<script>/*eslint-disable*/</script>
<template>
  <page-header-wrapper>
    <div class="operate">
      <a-button type="dashed" style="width: 100%; height: 10vh;" icon="plus" @click="add">添加</a-button>
    </div>
    <a-card style="margin-top: 26px">
      <a-list item-layout="horizontal" :data-source="AmazonData">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
            <a-avatar
              slot="avatar"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595077975290&di=0c0c3c7dddff03dc6dfc0b4ab90fed9f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F93%2F97%2F8056f2b41266a15.jpg"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>

    <a-card style="margin-top: 26px">
      <a-list item-layout="horizontal" :data-source="EbayData">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
            <a-avatar
              slot="avatar"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595078190185&di=d6f2eeb333a27a9fc80bbfca94654526&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F65%2F23%2F5bdff71a6c642_610.jpg"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import axios from 'axios'

const request = axios.create({ // eslint-disable-line no-unused-vars
  // API 请求的默认前缀
  baseURL: 'http://localhost:9000/system/',
  timeout: 6000 // 请求超时时间
})
const AmazonData = []
const EbayData = []
export default {
		name: 'MyStores',
		data () {
			return {
				sysUser: '',
        AmazonData,
        Ebaydata,
        request
			}
		},
    mounted () {
      this.getOnlineStores()
    },
		methods: {
			toHome () {
				this.$router.push({
					path: '/'
				})
			},
			getOnlineStores () {
				// var app = this
				console.log('hhh')
				request.post('StrStoreController/getOnlineStores', {
					'manBuyerId': 0,
					'userId': 3,
					'username': 'string'
				}).then(function (response) {
					console.log('sdsd')
					console.log(response)
					// var data = response.data.content
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
			saveBVOInfo () {
				// var app = this
				request.post('StrStoreController/addOnlineStore', {
					'SysUserDto': {
						'userId': 3
					},
					'StrStoreDto': {
						'storeName': 'addias',
						'plataeformType': '2'
					},
					'token': 'ABS1234',
					'APPId': '1231',
					'key': '13243424'
				}).then(function (response) {
					console.log('sdsd')
					console.log(response)
					console.log(response.data)
					// if (response.data.success) {
					// 	app.$router.push('/dashboard/mvo-workplace')
					// }
				})
			}
		}
	}
</script>

<style></style>
>>>>>>> Stashed changes
