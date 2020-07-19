<script>/* eslint-disable */</script>
<template>
  <div>
    <a-row>
<<<<<<< Updated upstream
      <a-col :span="8">
        <img
          style="width: 20vw; height: 20vw"
          :src="url"></img>
=======
      <a-col :span="13">
        <img style="width: 15vw; height: 15vw" :src="url" />
>>>>>>> Stashed changes
      </a-col>
      <a-col :span="5">
        <div>
          <font size="3" style="font-weight : bold">{{Name}}</font><br /><br />
          <font size="3">Price:  </font><font size="3" color=red>{{Price}}</font><br /><br />
          <font size="3">Sku:  {{Sku}}</font><br /><br />
          <font size="3">Brand:  {{Brand}}</font><br /><br />
          <font size="3">Stock in US:  {{Stock}}</font><br /><br />
            <a-row>
              <a-col :span="11">
                <a-button type="primary">Dropship Now</a-button>
              </a-col>
              <a-col :span="11">
                <a-button type="primary">Add to Wishlist</a-button>
              </a-col>
            </a-row>
        </div>
        
      </a-col>
      <a-col :span="2">

      </a-col>
    </a-row>
    
    <br/><br/><br/>
    <font size="5">Item Description</font>
    <div class="card-container">
    <a-tabs type="card" default-active-key="1" @change="callback">

      <!-- awaiting payments!!!!!!!!! -->
      <a-tab-pane key="1" tab="Ebay description">
        {{Ebaydes}}
      </a-tab-pane>
      <a-tab-pane key="2" tab="Amazon description">
        {{Amazondes}}
      </a-tab-pane>
    </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemDetail',
  data () {
    return {
      url: 'https://bkimg.cdn.bcebos.com/pic/f31fbe096b63f624101cb1748844ebf81a4ca300?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxMTY=,xp_5,yp_5',
      Ebaydes: '114514',
      Amazondes: '1919810',
      Name: 'Shirakami Fubuki',
      Price: '$122222',
      Brand: 'Hololive',
      Sku: '14552',
      Stock: '1'
      
    }
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    },
    callback (key) {
      console.log(key)
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
