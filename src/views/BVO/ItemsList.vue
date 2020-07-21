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
            <a-card class="ant-pro-pages-account-projects-card" hoverable @click="showDetail">
              <img slot="cover" :src="item.cover" :alt="item.title" />
              <a-card-meta :title="item.title">
                <template slot="description">
                  <ellipsis :length="50">{{ item.description }}</ellipsis>
                </template>
              </a-card-meta>
              <div class="cardItemContent">
                <span style="color: red">¥ 100</span>
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
        :visible="visible"
        :loading="confirmLoading"
        @okay="handleOk"
        @cancel="handleCancel"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import Detail from './Detail'
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
    Detail
  },
  data () {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true,
      visible: false,
      confirmLoading: false
    }
  },
  filters: {
    fromNow (date) {
      console.log(moment(date).fromNow())
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/article', { params: { count: 10 } }).then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    showDetail () {
      this.visible = true
    },
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    handleCancel () {
      this.visible = false
    },
    handleOk () {
      console.log('===========================')
      this.visible = false
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
