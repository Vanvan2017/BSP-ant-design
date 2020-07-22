<template>
  <page-header-wrapper>
    <a-card>
      <div class="ant-pro-pages-account-projects-cardList">
        <a-list
          :loading="loading"
          :data-source="data"
          :grid="{gutter:24,xxl:5,xl:4,lg:3,md:3,sm:2,xs:1 }"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card class="ant-pro-pages-account-projects-card" hoverable @click="showDetail(item)">
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
      <WishlistDetail
        :item="item"
        :visible="visible"
        :loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        @update="getData"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { axios as request } from '@/utils/request'
import { TagSelect, StandardFormRow, Ellipsis } from '@/components'
import WishlistDetail from './WishlistDetail'
import storage from 'store'

export default {
  name: 'StandardList',
  components: {
    Ellipsis,
    TagSelect,
    StandardFormRow,
    WishlistDetail
  },
  data () {
    return {
      data: [],
      confirmLoading: false,
      visible: false,
      item: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    showDetail (Oneitem) {
      console.log(Oneitem)
      this.item = Oneitem
      this.visible = true
      console.log(this.visible)
    },

    getData () {
      this.visible = false
      var _this = this
      request
        .post('/system/bvo/wishlist/list', {
          page: 0,
          size: 10,
          userId: storage.get('userId')
        })
        .then(function (response) {
          console.log(response)
          _this.data = response.content.list
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    handleCancel () {
      this.visible = false
    },
    handleOK () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 100px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
