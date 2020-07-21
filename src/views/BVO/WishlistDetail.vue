<script>
/*eslint-disable*/
</script>
<template>
  <div>
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
                <a-button type="danger" @click="sub(item.wit_id)">Remove from Wishlist</a-button>
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
import axios from 'axios'
export default {
  datas: '',
  id: '1',
  props: {
    InputVisible: {
      type: Boolean,
      required: true
    },
    visible: {
      type: Boolean,
      default: () => false
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    item: {
      uri: '',
      descrition: '',
      title: '',
      retail_price: '',
      sku_cd: '',
      pro_id: 0,
      ofp_id: ''
    }
  },
  data() {
    return {
      visible: false,
      // url: 'https://bkimg.cdn.bcebos.com/pic/f31fbe096b63f624101cb1748844ebf81a4ca300?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxMTY=,xp_5,yp_5',
      //   Ebaydes: '114514',
      //   Amazondes: '1919810',
      //   Name: 'Shirakami Fubuki',
      //   Price: '$12121',
      //   Brand: 'Hololive',
      //   Sku: '14552',
      //   Stock: '1',
      strId: 0,
      dropPrice: 0,
      dropshipStatus: 0,
      shelfStock: 0
    }
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/' })
    },
    callback(key) {
      console.log(key)
    },
    borrow() {
      var _this = this
      axios
        .post('http://localhost:9000/system/bvo/borrow', {
          dsrId: '4',
          createdBy: 'ccc',
          proId: _this.item.pro_id,
          preferDate: '2020-07-19 00:00:00',
          ofpId: _this.item.ofp_id,
          strId: _this.strId,
          dropshipPrice: _this.dropPrice,
          dropshipStatus: _this.dropshipStatus,
          shelfStock: _this.shelfStock
        })
        .then(function(response) {
          console.log(response)
          if (response.data.success === true) {
            _this.$message.info(`Borrow Succeed`)
          } else {
            _this.$message.error(`Borrow Failed`)
          }
          _this.InputVisible = false
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    handleCancel() {
      this.visible = false
    },
    handleOK() {
      this.visible = false
    },
    sub(id) {
      var _this = this
      axios
        .post('http://localhost:9000/system/bvo/wishlist/delete', {
          witId: id
        })
        .then(function(response) {
          console.log(response)
          if (response.data.success === true) {
            _this.$message.info(`Delete Succeed`)
            _this.$emit('update', '1')
            _this.visible = false
          } else {
            _this.$message.error(`Delete Failed`)
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

.card-container {
  background: #f5f5f5;
  overflow: hidden;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
