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
              <img slot="cover" :src="item.cover" :alt="item.title" />
              <a-card-meta :title="item.title">
                <template slot="description">
                  <ellipsis :length="50">{{ item.description }}</ellipsis>
                </template>
              </a-card-meta>
              <div class="cardItemContent">
                <span style="color: red"> $ {{ item.retail_price}}</span>
                <div class="avatarList">
                  <avatar-list>
                    <avatar-list-item
                      v-for="(member, i) in item.members"
                      :key="`${item.id}-avatar-${i}`"
                      :src="member.avatar"
                      :tips="member.name"
                    />
                  </avatar-list>
                </div>
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <detail
		ref="detail"
		:item="item"
        :visible="visible"
        :loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import { ItemDetail } from '@/views/BVO/ItemDetail'
import Detail from './Detail'
import axios from 'axios'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem

export default {
  name: 'ItemsList',
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ItemDetail,
    Detail
  },
  data () {
    return {
		data: [],
		form: this.$form.createForm(this),
		loading: true,
		visible: false,
		confirmLoading: false,
		item: {}
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
		axios.post('http://localhost:9000/system/bvo/product/listA',
		{
			page: 0,
			size: 10
		}).then(function (response) {
              console.log(response)
              _this.data = response.data.content.list
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
    // getList () {
    //   this.$http.get('/list/article', { params: { count: 10 } }).then(res => {
    //     console.log('res', res)
    //     this.data = res.result
    //     this.loading = false
    //   })
    // },
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
	getOnlineStores () {
		var app = this
		console.log('hhh')
		axios.post('http://localhost:9000/system/StrStoreController/getOnlineStores', {
			'manBuyerId': 0,
			'userId': 3,
			'username': 'string'
		}).then(function (response) {
			console.log('sdsd')
			console.log(response)
			response.data.content.forEach(item => {
				if (item.plataeformType === '1') {
					app.AmazonData.push(item)
				} else if (item.plataeformType === '2') {
					console.log(item)
					app.EbayData.push(item)
				}
			})
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
