<template>
  <div>
    <page-header-wrapper>
      <a-card>
        <div class="ant-pro-pages-account-projects-cardList">
          <a-list
            :loading="loading"
            :data-source="data"
            :grid="{gutter:24,xxl:5,xl:4,lg:3,md:3,sm:2,xs:1 }"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card
                class="ant-pro-pages-account-projects-card"
                hoverable
                @click="showDetail(item)"
              >
                <img slot="cover" :src="item.uri" :alt="item.title" />
                <a-card-meta :title="item.title">
                  <template slot="description">
                    <ellipsis :length="50">{{ item.descrition }}</ellipsis>
                  </template>
                </a-card-meta>
                <div class="cardItemContent">
                  <span style="color: red">$ {{ item.retail_price }}</span>
                </div>
              </a-card>
            </a-list-item>
          </a-list>
        </div>
      </a-card>
    </page-header-wrapper>
    <a-modal
      title="Item Details"
      :width="640"
      :visible="visible"
      :confirmLoading="loading"
      @ok="handleOK"
      @cancel="handleCancel"
    >
      <a-spin :spinning="loading">
        <div>
          <a-row>
            <a-col :span="14">
              <img style="width: 300px; height: 300px" :src="item.uri" />
            </a-col>
            <a-col :span="5">
              <div>
                <font size="3" style="font-weight : bold">{{ item.title }}</font>
                <br />
                <br />
                <font size="3">Price:</font>
                <font size="3" color="red">{{ item.retail_price }}</font>
                <br />
                <br />
                <font size="3">Sku: {{ item.sku_cd }}</font>
                <br />
                <br />
                <font size="3">Brand: {{ item.name_en }}</font>
                <br />
                <br />
                <!-- <font size="3">Stock in US: {{ item.Stock }}</font> -->
                <br />
                <br />
                <a-button type="primary" @click="InputVisible=true">Dropship Now</a-button>
                <br />
                <br />
                <a-button type="primary" @click="add">Add to Wishlist</a-button>
              </div>
            </a-col>
            <a-col :span="2"></a-col>
          </a-row>
          <br />
          <br />
          <font size="5">Item Description</font>
          <div class="card-container">
            <a-tabs type="card" default-active-key="1" @change="callback">
              <!-- awaiting payments!!!!!!!!! -->
              <a-tab-pane key="1" tab="Ebay description">{{ item.descrition }}</a-tab-pane>
              <a-tab-pane key="2" tab="Amazon description">{{ item.descrition }}</a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </a-spin>
    </a-modal>
    <a-modal v-model="InputVisible" title="Information Input" @ok="borrow">
      Store ID:
      <a-input placeholder="Please input store ID" v-model="strId" />
      <br />
      <br />Dropship Price:
      <a-input placeholder="Please input dropship price" v-model="dropPrice" />
      <br />
      <br />Dropship Status:
      <br />
      <a-select
        default-value="On Shelf"
        style="width: 120px"
        @change="handleChange"
        v-model="dropshipStatus"
      >
        <a-select-option value="0">Submit</a-select-option>
        <a-select-option value="1">On Shelf</a-select-option>
        <a-select-option value="2">Off Shelf</a-select-option>
      </a-select>
      <br />
      <br />Shelf Stock:
      <a-input placeholder="Please input shelf stock amount" v-model="shelfStock" />
      <br />
      <br />
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis } from '@/components'
import { axios as request } from '@/utils/request'
import storage from 'store'

export default {
  name: 'ItemsList',
  components: {
    Ellipsis,
    TagSelect,
    StandardFormRow
  },
  data () {
    return {
      InputVisible: false,
      data: [],
      form: this.$form.createForm(this),
      loading: true,
      visible: false,
      confirmLoading: false,
      item: {},
      // Ebaydes: '114514',
      // Amazondes: '1919810',
      strId: 0,
      dropPrice: 0,
      dropshipStatus: 0,
      shelfStock: 0
    }
  },
  filters: {
    fromNow (date) {
      console.log(moment(date).fromNow())
      return moment(date).fromNow()
    }
  },
  created () {
    var _this = this
   request
      .post('/system/bvo/product/listA', {
        page: 0,
        size: 10
      })
      .then(function (response) {
        console.log(response)
        _this.data = response.content.list
        _this.loading = false
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  // mounted () {
  //   this.getList()
  // },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },

    showDetail (Oneitem) {
      console.log(Oneitem)
      this.item = Oneitem
      this.visible = true
      console.log(this.visible)
    },
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    handleCancel () {
      this.visible = false
    },
    handleOK () {
      this.visible = false
    },
    add () {
      // console.log("hhhhh")
      var _this = this
      // console.log(_this.item.pro_id)
     request
        .post('/system/bvo/wishlist/insert', {
          dsrId: storage.get('userId'), // 就是userId，在后端会转换成真正的dsrId
          proId: _this.item.pro_id,
          createdBy: 'ccc'
        })
        .then(function (response) {
          console.log(response)
          if (response.success === true) {
            _this.$message.info(`Add Succeed`)
          } else {
            _this.$message.error(`Add Failed`)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    borrow () {
      var _this = this
     request
        .post('/system/bvo/borrow', {
          dsrId: storage.get('userId'),
          createdBy: 'ccc',
          proId: _this.item.pro_id,
          preferDate: '2020-07-19 00:00:00',
          ofpId: '5',
          strId: _this.strId,
          dropshipPrice: _this.dropPrice,
          dropshipStatus: _this.dropshipStatus,
          shelfStock: _this.shelfStock
        })
        .then(function (response) {
          console.log(response)
          if (response.success === true) {
            _this.$message.info(`Borrow Succeed`)
          } else {
            _this.$message.error(`Borrow Failed`)
          }
          _this.InputVisible = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-pages-account-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
